'use server';

// External packages
import { z } from 'zod';
import { HttpTypes } from '@medusajs/types';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// Lib
import { sdk } from '@/lib/config/config';
import { getAuthHeaders, setAuthToken } from '@/lib/data/cookies';
import { getCartId, removeAuthToken } from '@/lib/data/cookies';

// Hooks
import {
  loginFormSchema,
  LoginArgs,
  signupSchema,
  SignUpArgs,
} from '@/hooks/auth';

export async function getCustomer() {
  try {
    const { customer } = await sdk.client.fetch<{
      customer: HttpTypes.StoreCustomer;
    }>(`/store/customers/me`, {
      next: { tags: ['customer'] },
      headers: await getAuthHeaders(),
      cache: 'no-store',
    });

    return customer;
  } catch (error) {
    if (error) return null;
  }
}

export async function login(data: LoginArgs) {
  try {
    const validatedData = loginFormSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        state: 'error' as const,
        message: 'Invalid login credentials',
      };
    }

    const token = await sdk.auth.login('customer', 'emailpass', {
      email: validatedData.data.email,
      password: validatedData.data.password,
    });

    // User already logged in handle that straightly
    if (typeof token === 'object')
      redirect(validatedData.data.redirect_url || '/');

    // If there is no token returned than handle the error
    if (typeof token !== 'string') {
      return {
        state: 'error' as const,
        message: 'Something went wrong please try again',
      };
    }

    await setAuthToken(token);
    revalidateTag('customer');

    const cartId = await getCartId();
    if (cartId) {
      await sdk.store.cart.transferCart(cartId, {}, await getAuthHeaders());
    }

    redirect(validatedData.data.redirect_url || '/');
  } catch (error) {
    return {
      state: 'error' as const,
      message: error instanceof Error ? error.message : (error as string),
    };
  }
}

export async function signUp(data: SignUpArgs) {
  try {
    const validatedData = signupSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        state: 'error' as const,
        message: 'Invalid signup credentials',
      };
    }

    const signUpToken = await sdk.auth.register('customer', 'emailpass', {
      email: validatedData.data.email,
      password: validatedData.data.password,
    });

    const { customer } = await sdk.store.customer.create(
      {
        email: validatedData.data.email,
        first_name: validatedData.data.first_name,
        last_name: validatedData.data.last_name,
      },
      {},
      {
        authorization: `Bearer ${signUpToken}`,
      }
    );

    const loginToken = await sdk.auth.login('customer', 'emailpass', {
      email: validatedData.data.email,
      password: validatedData.data.password,
    });

    if (typeof loginToken === 'object') redirect(loginToken.location);

    // If there is no token returned than handle the error
    if (typeof loginToken !== 'string') {
      return {
        state: 'error' as const,
        message: 'Something went wrong please try again',
      };
    }
    await setAuthToken(loginToken);

    await sdk.client.fetch('/store/custom/customer/send-welcome-email', {
      method: 'POST',
      headers: await getAuthHeaders(),
    });
    revalidateTag('customer');
    return {
      state: 'success' as const,
      ...customer,
    };
  } catch (error) {
    return {
      state: 'error' as const,
      error: error instanceof Error ? error.message : (error as string),
    };
  }
}

// Forgot password (send email)
const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function forgotPassword({
  email,
}: z.infer<typeof forgotPasswordSchema>) {
  try {
    const validatedData = forgotPasswordSchema.safeParse({
      email,
    });

    if (!validatedData.success) {
      return {
        state: 'error' as const,
        message: 'Invalid mail',
      };
    }

    await sdk.auth.resetPassword('customer', 'emailpass', {
      identifier: validatedData.data.email,
    });
    return {
      state: 'success' as const,
      message: 'Password reset email sent',
    };
  } catch (error) {
    console.error(error);
    return {
      state: 'error' as const,
      message: 'Failed to reset password',
    };
  }
}

export async function isLoggedInForgotPasswordReset() {
  const user = await getCustomer();

  if (!user) {
    return {
      state: 'error' as const,
      message: "User doesn't exists",
    };
  }
  return forgotPassword({ email: user.email });
}

// Reset password

const resetFormDataSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  oldPassword: z.string().min(6).optional(),
  repeatPassword: z
    .string()
    .min(6, 'Password must be atleast 6 charachters long'),
  type: z.union([z.literal('forgot'), z.literal('reset')]),
});
type ResetFormDataArgs = z.infer<typeof resetFormDataSchema>;

export async function resetPassword(data: ResetFormDataArgs) {
  const validatedData = resetFormDataSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      state: 'error' as const,
      message: 'Invalid reset password data',
    };
  }

  if (validatedData.data.type === 'reset') {
    try {
      await sdk.auth.login('customer', 'emailpass', {
        email: validatedData.data.email,
        password: validatedData.data.oldPassword,
      });
    } catch (error) {
      console.error(error);
      return {
        state: 'error' as const,
        message: 'Wrong password',
      };
    }
  }

  try {
    await sdk.auth.updateProvider(
      validatedData.data.type === 'reset' ? 'logged-in-customer' : 'customer',
      'emailpass',
      {
        email: validatedData.data.email,
        password: validatedData.data.repeatPassword,
      },
      validatedData.data.token
    );

    return {
      state: 'success' as const,
    };
  } catch {
    return {
      state: 'error' as const,
      message: 'Failed to update password',
    };
  }
}

export async function logOut() {
  await sdk.auth.logout();
  await removeAuthToken();
  revalidateTag('customer');
}
