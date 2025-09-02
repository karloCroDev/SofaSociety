'use client';

// External packages
import * as React from 'react';

// Components
import { AddToCart } from '@/components/shop/AddToCart';

// Hooks
import {
  useCart,
  // useCart,
  useUpdateCartItem,
} from '@/hooks/cart';
//  import { useQueryClient } from '@tanstack/react-query';

// lib
import { withReactQueryProvider } from '@/lib/config/react-query';
import { HttpTypes } from '@medusajs/types';
import { useDebounce } from '@/hooks/util/useDebounce';
import { useQueryClient } from '@tanstack/react-query';

export const CartItemPicker: React.FC<{
  cart: HttpTypes.StoreCart; // Dodaj ovo za
  itemId: string;
  amount: number;
  maxAmount: number;
}> = withReactQueryProvider(({ amount, itemId, maxAmount, cart }) => {
  const queryClient = useQueryClient();
  const { data: clientCart } = useCart({
    initialData: cart,
  });

  // Karlo: Handle the inital load to be the client and then. Why because this won't be saved in memory

  // const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
  // const pendingUpdatesRef = React.useRef<Record<string, number>>({}); // lineItemId -> quantity

  // const { mutate, isPending } = useUpdateCartItem({
  //   onMutate: async (newItems) => {
  //     // cancel any running queries
  //     await queryClient.cancelQueries({ queryKey: ['cart'] });

  //     const prevCart = queryClient.getQueryData<HttpTypes.StoreCart>(['cart']);

  //     // optimistic update in cache
  //     queryClient.setQueryData(
  //       ['cart'],
  //       (old: HttpTypes.StoreCart | undefined) => {
  //         if (!old) return old;
  //         return {
  //           ...old,
  //           items: old.items?.map((item) => {

  //             return newItems.lineItemId === item.id
  //             ? { ...item, quantity: newItems.quantity }
  //             : item
  //           }
  //           ),
  //         };
  //       }
  //     );

  //     return { prevCart };
  //   },
  //   onError: (_err, _newItem, context) => {

  //     const ctx = context as
  //       | { prevCart: HttpTypes.StoreCart | undefined }
  //       | undefined;
  //     if (!ctx?.prevCart) return;
  //     if (!ctx.prevCart) return;
  //     queryClient.setQueryData(['cart'], ctx.prevCart);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['cart'] });
  //   },
  // });

  // const queueUpdate = (lineItemId: string, quantity: number) => {
  //   // save latest intended quantity
  //   pendingUpdatesRef.current[lineItemId] = quantity;

  //   // optimistic update immediately
  //   queryClient.setQueryData(['cart'], (old: HttpTypes.StoreCart | undefined) => {
  //     if (!old) return old;
  //     return {
  //       ...old,
  //       items: old.items?.map((item) =>
  //         item.id === lineItemId ? { ...item, quantity } : item
  //       ),
  //     };
  //   });

  //   // reset global debounce
  //   if (debounceRef.current) clearTimeout(debounceRef.current);

  //   debounceRef.current = setTimeout(() => {
  //     // flush all pending updates in one request
  //     const updates = { ...pendingUpdatesRef.current };
  //     pendingUpdatesRef.current = {};
  //     mutate(updates);
  //   }, 20000); // 20s
  // };

  // const lineItemData = clientCart?.items?.find((item) => item.id === itemId);

  const [localAmount, setLocalAmount] = React.useState(amount);

  return (
    <AddToCart
      className="mt-auto !w-fit"
      maxValue={maxAmount}
      onChange={(value) => {
        setLocalAmount(value as number);
      }}
      // isPending={isPending} // Je li ovo dovoljno ili moram još dodatno debouncati
      defaultValue={localAmount}
    />
  );
});
