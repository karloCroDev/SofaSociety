// External packages
import { HttpTypes } from '@medusajs/types';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { z } from 'zod';

// Lib
import {
  addItemToCart,
  deleteCartItem,
  getCart,
  updateCartItem,
  updateRegion,
} from '@/lib/data/cart';

export const useCart = (
  options?: Omit<
    UseQueryOptions<HttpTypes.StoreCart | undefined>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    ...options,
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });

export type AddItemToCartArgs = HttpTypes.StoreAddCartLineItem & {
  location?: string;
};
export const useAddCartItem = (
  options?: UseMutationOptions<void, Error, AddItemToCartArgs>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-cart-item'],
    mutationFn: (data: AddItemToCartArgs) => addItemToCart(data),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await options?.onSuccess?.(...args);
    },

    ...options,
  });
};

export const deleteCartItemSchema = z.object({
  lineItemId: z.string(),
});
export type DeleteItemArgs = z.infer<typeof deleteCartItemSchema>;

export const useDeleteCartItem = (
  options?: UseMutationOptions<void, Error, DeleteItemArgs>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-cart-item'],
    mutationFn: (data: DeleteItemArgs) => deleteCartItem(data),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const updateCartSchema = z.object({
  lineItemId: z.string(),
  quantity: z.number(),
});

export type UpdateCartItemArgs = z.infer<typeof updateCartSchema>;

export const useUpdateCartItem = (
  options?: UseMutationOptions<void, Error, UpdateCartItemArgs>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-cart-item'],
    mutationFn: (data: UpdateCartItemArgs) => updateCartItem(data),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export type UpdateRegionArgs = {
  countryCode: string;
  currentPath: string;
};

export const useUpdateRegion = (
  options?: UseMutationOptions<void, Error, UpdateRegionArgs>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-region'],
    mutationFn: (data: UpdateRegionArgs) => updateRegion(data),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
