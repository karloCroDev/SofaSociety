'use server';

// External packages
import { z } from 'zod';
import { HttpTypes } from '@medusajs/types';

// Lib
import { sdk } from '@/lib2/config';

// Hooks
import {
  CustomerAddressArgs,
  loginFormSchema,
  signupSchema,
} from '@/hooks2/customer';
import { getAuthHeaders, setAuthToken } from '@/lib2/data/cookies';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { getCartId, removeAuthToken } from '@/lib/data/cookies';

export const getCustomer = async function () {
  const { customer } = await sdk.client.fetch<{
    customer: HttpTypes.StoreCustomer;
  }>(`/store/customers/me`, {
    next: { tags: ['customer'] }, // NEXT TAG: customer
    headers: { ...(await getAuthHeaders()) },
    cache: 'no-store',
  });
  return customer;
};

type LoginArgs = z.infer<typeof loginFormSchema>;
export async function login({ email, password, redirect_url }: LoginArgs) {
  try {
    const token = await sdk.auth.login('customer', 'emailpass', {
      email,
      password,
    });

    // User already logged in handle that straightly
    if (typeof token === 'object') {
      return { success: true, redirectUrl: token.location };
    }

    // If there is no token returned than handle the error
    if (typeof token !== 'string') {
      return {
        success: false,
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

type SignUpArgs = z.infer<typeof signupSchema>;
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

export async function logOut() {
  await sdk.auth.logout();
  await removeAuthToken();
  revalidateTag('customer');
}

// Update users data
const updateCustomerDetailsSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(6).nullable().optional(),
});

export async function updateCustomerDetails({
  firstName,
  lastName,
  phone,
}: z.infer<typeof updateCustomerDetailsSchema>) {
  try {
    await sdk.store.customer.update(
      {
        first_name: firstName,
        last_name: lastName,
        phone: phone || '',
      },
      {},
      await getAuthHeaders()
    );
    revalidateTag('customer');

    return {
      state: 'success' as const,
      message: 'Customer details updated successfully',
    };
  } catch (error) {
    return {
      state: 'error' as const,
      message: 'Failed to update customer details',
    };
  }
}

// Address

export async function deleteCustomerAddress(addressId: string) {
  try {
    await sdk.store.customer.deleteAddress(addressId);
    revalidateTag('customer');

    return {
      state: 'success' as const,
      message: 'Address deleted successfully',
    };
  } catch (error) {
    return {
      state: 'error' as const,
      message: 'Failed to delete address',
    };
  }
}

const convertedObject = ({
  address1,
  city,
  countryCode,
  firstName,
  lastName,
  postalCode,
  address2,
  phone,
}: CustomerAddressArgs) => ({
  address_1: address1,
  address_2: address2 || '',
  city,
  country_code: countryCode,
  first_name: firstName,
  last_name: lastName,
  phone: phone || '',
  postal_code: postalCode,
});

export async function addCustomerAddress(data: CustomerAddressArgs) {
  try {
    await sdk.store.customer.createAddress(convertedObject(data));
    revalidateTag('customer');

    return {
      state: 'success' as const,
      message: 'Address added successfully',
    };
  } catch (error) {
    return {
      state: 'error' as const,
      message: 'Failed to add address',
    };
  }
}

export async function updateCustomerAddress(
  data: CustomerAddressArgs,
  addressId: string
) {
  try {
    await sdk.store.customer.updateAddress(addressId, convertedObject(data));
    revalidateTag('customer');

    return {
      state: 'success' as const,
      message: 'Address added successfully',
    };
  } catch (error) {
    return {
      state: 'error' as const,
      message: 'Failed to add address',
    };
  }
}
