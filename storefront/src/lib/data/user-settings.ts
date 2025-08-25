'use server';

// External packages
import { revalidateTag } from 'next/cache';

// Lib
import { sdk } from '@/lib/config/config';
import { getAuthHeaders } from '@/lib/data/cookies';

// Hooks
import {
  CustomerAddressArgs,
  customerAddressSchema,
  UpdateCustomerDetailsArgs,
  updateCustomerDetailsSchema,
} from '@/hooks/user-settings';

export async function updateCustomerDetails(data: UpdateCustomerDetailsArgs) {
  try {
    const validatedData = updateCustomerDetailsSchema.safeParse(data);

    if (!validatedData.success)
      return {
        state: 'error' as const,
        message: 'Invalid customer details',
      };

    await sdk.store.customer.update(
      {
        first_name: validatedData.data.firstName,
        last_name: validatedData.data.lastName,
        phone: validatedData.data.phone || '',
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
    console.error(error);
    return {
      state: 'error' as const,
      message: 'Failed to update customer details',
    };
  }
}

// Address
export async function deleteCustomerAddress(addressId: string) {
  try {
    if (!addressId)
      return {
        state: 'error' as const,
        message: 'Invalid address ID',
      };

    await sdk.store.customer.deleteAddress(addressId);
    revalidateTag('customer');

    return {
      state: 'success' as const,
      message: 'Address deleted successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      state: 'error' as const,
      message: 'Failed to delete address',
    };
  }
}

export async function addCustomerAddress(data: CustomerAddressArgs) {
  try {
    const validatedData = customerAddressSchema.safeParse(data);

    if (!validatedData.success)
      return {
        state: 'error' as const,
        message: 'Invalid customer address',
      };

    await sdk.store.customer.createAddress(
      validatedData.data,
      {},
      await getAuthHeaders()
    );
    revalidateTag('customer');

    return {
      state: 'success' as const,
      message: 'Address added successfully',
    };
  } catch (error) {
    console.error(error);
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
    const validatedData = customerAddressSchema.safeParse(data);

    if (!validatedData.success || !addressId)
      return {
        state: 'error' as const,
        message: 'Invalid customer address',
      };

    await sdk.store.customer.updateAddress(
      addressId,
      validatedData.data,
      {},
      await getAuthHeaders()
    );
    revalidateTag('customer');

    return {
      state: 'success' as const,
      message: 'Address updated successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      state: 'error' as const,
      message: 'Failed to update address',
    };
  }
}
