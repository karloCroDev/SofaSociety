// External packages
import { HttpTypes } from '@medusajs/types';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Lib
import {
  addItemToCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from '@/lib2/data/cart';

export const useCart = () =>
  useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });

export type AddItemToCartArgs = HttpTypes.StoreAddCartLineItem & {
  location?: string;
};
export const useAddCartItem = (
  options: UseMutationOptions<void, Error, AddItemToCartArgs>
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

export type DeleteItemArgs = {
  lineItemId: string;
};
export const useDeleteCartItem = (
  options: UseMutationOptions<void, Error, DeleteItemArgs>
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

export type UpdateCartItemArgs = HttpTypes.StoreUpdateCartLineItem & {
  lineItemId?: string;
};
export const useUpdateCartItem = (
  options: UseMutationOptions<void, Error, UpdateCartItemArgs>
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
