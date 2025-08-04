// External packages
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useEmailCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['email-checkout'],
    mutationFn: ({ email }: EmailFormArgs) => emailCheckout({ email }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      }),
  });
};

export const useAddressCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['address-checkout'],
    mutationFn: (data: CustomerAddressArgs) => addressCheckout(data),

    onSuccess: () =>
      queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      }),
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
export const useShippingOptionCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['shipping-checkout'],
    mutationFn: (data: ShippingOptionCheckoutArgs) =>
      shippingOptionCheckout(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      }),
  });
};
