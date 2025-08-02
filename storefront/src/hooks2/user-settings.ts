// External packages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import {
  deleteCustomerAddress,
  addCustomerAddress,
  updateCustomerAddress,
  updateCustomerDetails,
} from '@/lib2/data/user-settings';

// Address
export const updateCustomerDetailsSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(6).nullable().optional(),
});
export type UpdateCustomerDetailsArgs = z.infer<
  typeof updateCustomerDetailsSchema
>;

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-customer'],
    mutationFn: async (values: z.infer<typeof updateCustomerDetailsSchema>) => {
      return updateCustomerDetails(values);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customer'] }),
  });
};

export const customerAddressSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(3),
  address_1: z.string().min(1),
  address_2: z.string().optional(),
  city: z.string().min(1),
  postal_code: z.string().min(1),
  country_code: z.string().min(2),
  phone: z.string().optional(),
});
export type CustomerAddressArgs = z.infer<typeof customerAddressSchema>;

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-address'],
    mutationFn: (values: CustomerAddressArgs) => addCustomerAddress(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customer'] }),
  });
};

export const useUpdateAddress = (addressId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-address'],
    mutationFn: async (values: CustomerAddressArgs) => {
      return updateCustomerAddress(values, addressId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customer'] }),
  });
};

// Delete customer address
export const useDeleteCustomerAddress = (addressId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-address'],
    mutationFn: () => deleteCustomerAddress(addressId),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customer'] }),
  });
};
