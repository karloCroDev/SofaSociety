'use server';

// External packages
import { z } from 'zod';
import { revalidateTag } from 'next/cache';

// Lib
import { sdk } from '@/lib2/config';
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
    await sdk.store.customer.createAddress(
      convertedObject(data),
      {},
      await getAuthHeaders()
    );
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
    console.log(convertedObject(data));
    await sdk.store.customer.updateAddress(
      addressId,
      convertedObject(data),
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
