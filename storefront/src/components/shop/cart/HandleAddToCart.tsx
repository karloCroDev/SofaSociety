'use client';

// External packages
import * as React from 'react';

// Components
import { AddToCart } from '@/components/shop/AddToCart';

// Hooks
// import { useUpdateCartItem } from '@/hooks/cart';
//  import { useQueryClient } from '@tanstack/react-query';

// lib
import { withReactQueryProvider } from '@/lib/config/react-query';
import { TQueueUpdate } from '@/components/shop/cart/ItemMapping';
// import { HttpTypes } from '@medusajs/types';

export const CartItemPicker: React.FC<{
  itemId: string;
  amount: number;
  maxAmount: number;
  queueUpdate: TQueueUpdate;
  isPending: boolean;
}> = withReactQueryProvider(
  ({ amount, itemId, maxAmount, queueUpdate, isPending }) => {
    // Karlo: Handle the inital load to be the client and then. Why because this won't be saved in memory

    // const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
    // const pendingUpdatesRef = React.useRef<Record<string, number>>({}); // lineItemId -> quantity

    // const queryClient = useQueryClient();
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
    //               ? { ...item, quantity: newItems.quantity }
    //               : item;
    //           }),
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

    const [localAmount, setLocalAmount] = React.useState(amount);

    return (
      <AddToCart
        className="mt-auto !w-fit"
        maxValue={maxAmount}
        onChange={(value) => {
          setLocalAmount(value as number);
          queueUpdate({
            lineItemId: itemId,
            quantity: localAmount,
          });
        }}
        isPending={isPending}
        defaultValue={localAmount}
      />
    );
  }
);
