'use server';

// External packages
import { revalidateTag } from 'next/cache';

// Lib
import { sdk } from '@/lib2/config/config';
import { getAuthHeaders } from '@/lib2/data/cookies';

// Hooks
import {
  CustomerAddressArgs,
  UpdateCustomerDetailsArgs,
} from '@/hooks2/user-settings';

export async function updateCustomerDetails({
  firstName,
  lastName,
  phone,
}: UpdateCustomerDetailsArgs) {
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

export async function addCustomerAddress(data: CustomerAddressArgs) {
  try {
    await sdk.store.customer.createAddress(data, {}, await getAuthHeaders());
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
    await sdk.store.customer.updateAddress(
      addressId,
      data,
      {},
      await getAuthHeaders()
    );
    revalidateTag('customer');

    return {
      state: 'success' as const,
      message: 'Address updated successfully',
    };
  } catch (error) {
    return {
      state: 'error' as const,
      message: 'Failed to update address',
    };
  }
}
