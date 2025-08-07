// External packages
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addressCheckout,
  choosePaymentMethod,
  emailCheckout,
  getAllShippingOptions,
  getPaymentMethod,
  initiatePaymentSession,
  listPaymentProviders,
  shippingOptionCheckout,
} from '@/lib2/data/checkout';
import { z } from 'zod';

// Hooks
import { CustomerAddressArgs } from '@/hooks2/user-settings';
import { HttpTypes } from '@medusajs/types';

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
    mutationFn: ({ email }) => emailCheckout({ email }),
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
    mutationFn: (data) => addressCheckout(data),
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
    mutationFn: (data) => shippingOptionCheckout(data),
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

// Stripe
export const useListPaymentProviders = (
  regionId?: string,
  options?: UseMutationOptions<HttpTypes.StorePaymentProvider[], Error, void>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['shipping-checkout-stripe'],
    mutationFn: () => listPaymentProviders(regionId),
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

export const useGetPaymentMethod = (id?: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => getPaymentMethod(id),
  });
};

export type ChoosePaymentMethodOption = {
  sessionId: string;
  token: string | null | undefined;
};

export const useInitiatePaymentSession = (
  providerId: string,
  options?: UseMutationOptions<HttpTypes.StorePaymentCollection, Error, void>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['start-payment-session'],
    mutationFn: async () => initiatePaymentSession(providerId),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        // exact: false,
        queryKey: ['cart'],
      });

      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
export const useChoosePaymentMethod = (
  options?: UseMutationOptions<void, Error, ChoosePaymentMethodOption>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['choose-payment'],
    mutationFn: async ({ sessionId, token }) => {
      await choosePaymentMethod({
        sessionId,
        token,
      });
    },

    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        // exact: false,
        queryKey: ['cart'],
      });

      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
