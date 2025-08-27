'use client';

// External packages
import * as React from 'react';

// Components
import { AddToCart } from '@/components/shop/AddToCart';

// Hooks
import {
  // useCart,
  useUpdateCartItem,
} from '@/hooks/cart';
//  import { useQueryClient } from '@tanstack/react-query';

// lib
import { withReactQueryProvider } from '@/lib/config/react-query';
import { HttpTypes } from '@medusajs/types';

export const CartItemPicker: React.FC<{
  cart: HttpTypes.StoreCart; // Dodaj ovo za
  itemId: string;
  amount: number;
  maxAmount: number;
}> = withReactQueryProvider(({ amount, itemId, maxAmount }) => {
  // Ante: Reci mi samo koji je bolji nacin za handlanje optimistic updatea

  // Ante: Approach 1: Handleanje sa react queryiem, nista dodatno ne fectham samo passam cart sa server paa od cart i onda handleam (optimistic update)

  // const queryClient = useQueryClient();
  // const { data: clientCart } = useCart({
  //   initialData: cart,
  // });
  // const { mutate, isPending } = useUpdateCartItem({
  //   onMutate: async (newItem) => {
  //     await queryClient.cancelQueries({ queryKey: ['cart'] });

  //     const prevCart = queryClient.getQueryData<HttpTypes.StoreCart>(['cart']);

  //     // optimistic update
  //     queryClient.setQueryData(
  //       ['cart'],
  //       (old: HttpTypes.StoreCart | undefined) => {
  //         if (!old) return old;
  //         return {
  //           ...old,
  //           items: old.items?.map((item) =>
  //             item.id === newItem.lineItemId
  //               ? { ...item, quantity: newItem.quantity }
  //               : item
  //           ),
  //         };
  //       }
  //     );

  //     return { prevCart };
  //   },
  //   onError: (
  //     _err,
  //     _newItem,
  //     context: unknown // Ante: Je li znaš možda zašto ne inferam typesafety
  //   ) => {
  //     const ctx = context as
  //       | { prevCart: HttpTypes.StoreCart | undefined }
  //       | undefined;
  //     if (!ctx?.prevCart) return;
  //     queryClient.setQueryData(['cart'], ctx.prevCart);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['cart'] });
  //   },
  // });

  // const lineItemData = clientCart?.items?.find((item) => item.id === itemId);

  // Ante: Approach 2: Ručno handleanje sa podatcima
  const [localAmount, setLocalAmount] = React.useState(amount);
  const { mutate, isPending } = useUpdateCartItem({
    onError: () => {
      setLocalAmount(amount);
    },
  });

  console.log(isPending);

  return (
    <AddToCart
      className="mt-auto !w-fit"
      maxValue={maxAmount}
      onChange={(value) => {
        mutate({
          lineItemId: itemId,
          quantity: value as number,
        });
        setLocalAmount(value as number);
      }}
      isPending={isPending} // Je li ovo dovoljno ili moram još dodatno debouncati
      defaultValue={localAmount}
    />
  );
});
