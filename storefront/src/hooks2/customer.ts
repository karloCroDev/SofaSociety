import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {} from // addCustomerAddress,
// deleteCustomerAddress,

//   resetPassword,
// getCustomer,
// login,
// signout,
// signup,
// updateCustomer,
// updateCustomerAddress,
'@/lib/data/customer';
import { z } from 'zod';
import { StoreCustomer } from '@medusajs/types';

import {
  login,
  signUp,
  logOut,
  getCustomer,
  resetPassword,
  updateCustomerDetails,
  deleteCustomerAddress,
  addCustomerAddress,
  updateCustomerAddress,
} from '@/lib2/data/auth';

// Customer
export const useCustomer = () => {
  return useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      return getCustomer();
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Login
export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  redirect_url: z.string().optional().nullable(),
});

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: z.infer<typeof loginFormSchema>) => {
      return login({ ...values });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
  });
};

// Sign up
export const signupSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().optional().nullable(),
  password: z.string().min(6),
});

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (values: z.infer<typeof signupSchema>) => {
      return signUp(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
  });
};

// Log out
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logOut'],
    mutationFn: async () => {
      return logOut();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
  });
};

// Update customer
export const updateCustomerDetailsSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(6).nullable().optional(),
});

export const useUpdateCustomer = (
  options?: UseMutationOptions<
    { state: 'error' | 'success' | 'initial'; error?: string },
    Error,
    z.infer<typeof updateCustomerDetailsSchema>
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-customer'],
    mutationFn: async (values: z.infer<typeof updateCustomerDetailsSchema>) => {
      return updateCustomerDetails(values);
    },
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
    ...options,
  });
};
// HANDLE THIS!!!!!

// Address

export const customerAddressSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(3),
  address1: z.string().min(1),
  address2: z.string().optional().nullable(),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  countryCode: z.string().min(2),
  phone: z.string().optional().nullable(),
});
export type CustomerAddressArgs = z.infer<typeof customerAddressSchema>;

export const useAddAddress = (
  options?: UseMutationOptions<
    { state: 'success' | 'error'; message: string | null },
    Error,
    z.infer<typeof customerAddressSchema>
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-address'],
    mutationFn: async (values: z.infer<typeof customerAddressSchema>) => {
      return addCustomerAddress(values);
    },
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateAddress = (
  addressId: string,
  options?: UseMutationOptions<
    { state: 'success' | 'error'; message: string | null },
    Error,
    z.infer<typeof customerAddressSchema>
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-address'],
    mutationFn: async (values: z.infer<typeof customerAddressSchema>) => {
      return updateCustomerAddress(values, addressId);
    },
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

// Delete customer address
export const useDeleteCustomerAddress = (
  options?: UseMutationOptions<
    {
      state: 'error' | 'success';
      message: string;
    },
    Error,
    string
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-address'],
    mutationFn: async (addressId: string) => {
      return deleteCustomerAddress(addressId);
    },
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
