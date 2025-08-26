'use client';

// External packages
import * as React from 'react';

// Components
import { AddToCart } from '@/components/shop/AddToCart';

// Hooks
import { useCart, useUpdateCartItem } from '@/hooks/cart';

// lib
import { withReactQueryProvider } from '@/lib/config/react-query';
import { HttpTypes } from '@medusajs/types';
import { useQueryClient } from '@tanstack/react-query';

export const CartItemPicker: React.FC<{
  cart: HttpTypes.StoreCart;
  itemId: string;
  amount: number;
  maxAmount: number;
}> = withReactQueryProvider(({ amount, itemId, maxAmount, cart }) => {
  const queryClient = useQueryClient();
  const { data: clientCart } = useCart(cart); // Oke, so this is being fetched on the sever AND then I am passing it like this so I could handle this on client. I feel this is too much, and could be done more easily.

  const { mutate, isPending } = useUpdateCartItem({
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const prevCart = queryClient.getQueryData<HttpTypes.StoreCart>(['cart']);

      // optimistic update
      queryClient.setQueryData(
        ['cart'],
        (old: HttpTypes.StoreCart | undefined) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items?.map((item) =>
              item.id === newItem.lineItemId
                ? { ...item, quantity: newItem.quantity }
                : item
            ),
          };
        }
      );

      return { prevCart };
    },
    onError: (
      _err,
      _newItem,
      context: unknown // Ante: Je li znaš možda zašto ne inferam typesafety
    ) => {
      const ctx = context as
        | { prevCart: HttpTypes.StoreCart | undefined }
        | undefined;
      if (!ctx?.prevCart) return;
      queryClient.setQueryData(['cart'], ctx.prevCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const lineItemId = clientCart?.items?.find((item) => item.id === itemId);

  return (
    <AddToCart
      className="mt-auto !w-fit"
      maxValue={maxAmount}
      onChange={(value) => {
        mutate({
          lineItemId: itemId,
          quantity: value as number,
        });
      }}
      isPending={isPending}
      defaultValue={lineItemId?.quantity || amount}
      isDisabled={isPending} // Disabling (debouncing) after it is possible to do this once ahg
    />
  );
});
