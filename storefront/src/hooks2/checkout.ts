// External packages
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addressCheckout,
  emailCheckout,
  getAllShippingOptions,
  shippingOptionCheckout,
} from '@/lib2/data/checkout';
import { z } from 'zod';

// Hooks
import { CustomerAddressArgs } from '@/hooks2/user-settings';

export const emailFormSchema = z.object({
  email: z.string().email(),
});
export type EmailFormArgs = z.infer<typeof emailFormSchema>;

export const useEmailCheckout = (
  options?: UseMutationOptions<
    { state: 'success' | 'error'; message: string },
    Error,
    EmailFormArgs
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['email-checkout'],
    mutationFn: ({ email }: EmailFormArgs) => emailCheckout({ email }),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useAddressCheckout = (
  options?: UseMutationOptions<
    { state: 'success' | 'error'; message: string },
    Error,
    CustomerAddressArgs
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['address-checkout'],
    mutationFn: (data: CustomerAddressArgs) => addressCheckout(data),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useGetCartShippingOptions = (cartId: string) => {
  return useQuery({
    queryKey: [cartId],
    queryFn: () => getAllShippingOptions(cartId),
  });
};

export type ShippingOptionCheckoutArgs = {
  cartId: string;
  optionId: string;
};
// Karlo: Setting shipping options so no need for error message
export const useShippingOptionCheckout = (
  options?: UseMutationOptions<void, Error, ShippingOptionCheckoutArgs>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['shipping-checkout'],
    mutationFn: (data: ShippingOptionCheckoutArgs) =>
      shippingOptionCheckout(data),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
