import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emailCheckout } from '@/lib2/data/checkout';
import { z } from 'zod';

export const emailFormSchema = z.object({
  email: z.string().email(),
});
export type EmailFormArgs = z.infer<typeof emailFormSchema>;

export const useEmailCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['email-checkout'],
    mutationFn: async ({ email }: EmailFormArgs) =>
      await emailCheckout({ email }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      });
    },
  });
};

export const useAddressCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['set-email'],
    mutationFn: async (data: EmailFormArgs) => emailCheckout(data),
    onSuccess: async function () {
      await queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      });
    },
  });
};

export const usePaymentCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['set-email'],
    mutationFn: async (data: EmailFormArgs) => emailCheckout(data),

    onSuccess: async function () {
      await queryClient.invalidateQueries({
        // exact: false // See if I need this (if something starts also with cart)
        queryKey: ['cart'],
      });
    },
  });
};
