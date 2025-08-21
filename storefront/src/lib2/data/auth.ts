'use server';

// External packages
import { z } from 'zod';
import { HttpTypes } from '@medusajs/types';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// Lib
import { sdk } from '@/lib2/config/config';
import { getAuthHeaders, setAuthToken } from '@/lib2/data/cookies';
import { getCartId, removeAuthToken } from '@/lib/data/cookies';

// Hooks
import {
  loginFormSchema,
  LoginArgs,
  signupSchema,
  SignUpArgs,
} from '@/hooks2/auth';

export async function getCustomer() {
  const { customer } = await sdk.client.fetch<{
    customer: HttpTypes.StoreCustomer;
  }>(`/store/customers/me`, {
    next: { tags: ['customer'] }, // NEXT TAG: customer
    headers: await getAuthHeaders(),
    cache: 'no-store',
  });
  return customer;
}

export async function login({ email, password, redirect_url }: LoginArgs) {
  try {
    const token = await sdk.auth.login('customer', 'emailpass', {
      email,
      password,
    });

    // User already logged in handle that straightly
    if (typeof token === 'object') {
      return { state: 'success' as const, redirectUrl: token.location };
    }

    // If there is no token returned than handle the error
    if (typeof token !== 'string') {
      return {
        state: 'error' as const,
        message: 'Uhoh something went wrong please try again',
      };
    }
    console.log('Token', token);
    await setAuthToken(token);
    revalidateTag('customer');

    const cartId = await getCartId();
    if (cartId) {
      await sdk.store.cart.transferCart(cartId, {}, await getAuthHeaders());
      revalidateTag('cart');
    }

    return { state: 'success' as const, redirectUrl: redirect_url || '/' };
  } catch (error) {
    return {
      state: 'error' as const,
      message: error instanceof Error ? error.message : (error as string),
    };
  }
}

export async function signUp({
  email,
  first_name,
  last_name,
  password,
}: SignUpArgs) {
  try {
    const signUpToken = await sdk.auth.register('customer', 'emailpass', {
      email,
      password,
    });

    const { customer } = await sdk.store.customer.create(
      {
        email,
        first_name,
        last_name,
      },
      {},
      {
        authorization: `Bearer ${signUpToken}`,
      }
    );

    const loginToken = await sdk.auth.login('customer', 'emailpass', {
      email,
      password,
    });

    if (typeof loginToken === 'object') redirect(loginToken.location);

    // If there is no token returned than handle the error
    if (typeof loginToken !== 'string') {
      return {
        state: 'error' as const,
        message: 'Uhoh something went wrong please try again',
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
    await sdk.auth.resetPassword('customer', 'emailpass', {
      identifier: email,
    });
    return {
      state: 'success' as const,
      message: 'Password reset email sent',
    };
  } catch (error) {
    return {
      state: 'error' as const,
      message: 'Failed to reset password',
    };
  }
}

export async function isLoggedInForgotPasswordReset() {
  const user = await getCustomer().catch(() => null);

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

export async function resetPassword({
  email,
  token,
  oldPassword,
  repeatPassword,
  type,
}: ResetFormDataArgs) {
  if (type === 'reset') {
    try {
      await sdk.auth.login('customer', 'emailpass', {
        email,
        password: oldPassword!,
      });
    } catch (error) {
      return {
        state: 'error' as const,
        message: 'Wrong password',
      };
    }
  }

  try {
    await sdk.auth.updateProvider(
      type === 'reset' ? 'logged-in-customer' : 'customer',
      'emailpass',
      {
        email,
        password: repeatPassword,
      },
      token
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
