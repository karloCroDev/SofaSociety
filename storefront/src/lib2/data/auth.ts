'use server';

// External packages
import { z } from 'zod';
import { HttpTypes } from '@medusajs/types';

// Lib
import { sdk } from '@/lib2/config';

// Hooks
import { loginFormSchema, signupFormSchema } from '@/hooks/customer';
import { getAuthHeaders, setAuthToken } from '@/lib2/data/cookies';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { getCartId } from '@/lib/data/cookies';

export const getCustomer = async function () {
  return await sdk.client
    .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
      next: { tags: ['customer'] }, // NEXT TAG: customer
      headers: { ...(await getAuthHeaders()) },
      cache: 'no-store',
    })
    .then(({ customer }) => customer)
    .catch(() => null);
};

type LoginArgs = z.infer<typeof loginFormSchema>;
export async function login({ email, password, redirect_url }: LoginArgs) {
  try {
    const token = await sdk.auth.login('customer', 'emailpass', {
      email,
      password,
    });

    if (typeof token !== 'string')
      return {
        success: false,
        message: 'Authentication requires additional steps',
      };

    await setAuthToken(token);
    revalidateTag('customer');

    const cartId = await getCartId();
    if (cartId) {
      await sdk.store.cart.transferCart(cartId, {}, await getAuthHeaders());
      revalidateTag('cart');
    }
    return { success: true, redirectUrl: redirect_url || '/' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : error,
    };
  }
}

type SignUpArgs = z.infer<typeof signupFormSchema>;

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

    await setAuthToken(loginToken);

    await sdk.client.fetch('/store/custom/customer/send-welcome-email', {
      method: 'POST',
      headers: await getAuthHeaders(),
    });
    revalidateTag('customer');
    return { success: true, customer };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : error,
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

const otpDataSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});
type OtpDataArgs = z.infer<typeof otpDataSchema>;

const resetFormDataSchema = z.object({
  newPassword: z.string().min(6, 'Password must be atleast 6 charachters long'),
  type: z.union([z.literal('forgot'), z.literal('reset')]),
});
type ResetFormDataArgs = z.infer<typeof resetFormDataSchema>;

export async function resetPassword(
  initialValue: unknown,
  { newPassword, type }: ResetFormDataArgs
): Promise<
  | (OtpDataArgs & { state: 'initial' | 'success' })
  | { state: 'error'; message: string }
> {
  const validate = otpDataSchema.parse(initialValue);

  if (type === 'reset') {
    try {
      await sdk.auth.login('customer', 'emailpass', {
        email: validate.email,
        password: newPassword,
      });
    } catch (error) {
      return {
        ...validate,
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
        email: validate.email,
        password: newPassword,
      },
      validate.token
    );

    return {
      ...validate,
      state: 'success' as const,
    };
  } catch {
    return {
      ...validate,
      state: 'error' as const,
      message: 'Failed to update password',
    };
  }
}

export async function nameUsername({ regionId }: { regionId: string }) {
  await sdk.store.payment.listPaymentProviders({
    region_id: regionId,
  });
}
