// External packages
import { HttpTypes } from '@medusajs/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Lib 2
import {
  addItemToCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from '@/lib2/data/cart';

export const useCart = () =>
  useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCart(),
  });

export type AddItemToCartArgs = HttpTypes.StoreAddCartLineItem & {
  location?: string;
};
export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-cart-item'],
    mutationFn: async (data: AddItemToCartArgs) => addItemToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export type DeleteItemArgs = {
  lineItemId: string;
};
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-cart-item'],
    mutationFn: async (data: DeleteItemArgs) => deleteCartItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export type UpdateCartItemArgs = HttpTypes.StoreUpdateCartLineItem & {
  lineItemId?: string;
};
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-cart-item'],
    mutationFn: async (data: UpdateCartItemArgs) => updateCartItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
