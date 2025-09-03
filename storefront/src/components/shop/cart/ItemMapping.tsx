'use client';

// External packages
import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { HttpTypes } from '@medusajs/types';

// Hooks
import { useCart, useUpdateCartItem } from '@/hooks/cart';
import { getPricesForVariant } from '@/lib/util/money';
import { Products } from '@/components/shop/cart/Products';
import Image from 'next/image';
import { withReactQueryProvider } from '@/lib/config/react-query';

export type TQueueUpdate = ({
  lineItemId,
  quantity,
}: {
  lineItemId: string;
  quantity: number;
}) => void;

export const ItemMapping: React.FC<{
  cart: HttpTypes.StoreCart | undefined;
}> = withReactQueryProvider(({ cart }) => {
  const queryClient = useQueryClient();
  const { data: clientCart } = useCart({
    initialData: cart,
  });

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
      context
      // Je li znas zasto na context ne dobivam vrijednost
    ) => {
      const ctx = context as
        | { prevCart: HttpTypes.StoreCart | undefined }
        | undefined;
      if (ctx?.prevCart) {
        queryClient.setQueryData(['cart'], ctx.prevCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const [pendingUpdates, setPendingUpdates] = React.useState<
    Record<string, number>
  >({});

  const queueUpdate = ({
    lineItemId,
    quantity,
  }: {
    lineItemId: string;
    quantity: number;
  }) => {
    // save latest intended quantity
    pendingUpdates[lineItemId] = quantity;

    // optimistic update immediately
    queryClient.setQueryData(
      ['cart'],
      (old: HttpTypes.StoreCart | undefined) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items?.map((item) =>
            item.id === lineItemId ? { ...item, quantity } : item
          ),
        };
      }
    );

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      Object.entries(pendingUpdates).forEach(([lineItemId, quantity]) => {
        mutate({ lineItemId, quantity });
      });
      setPendingUpdates({});
    }, 5000);
  };

  return clientCart?.items?.length ? (
    clientCart.items.map((item, i) => {
      const { original_price, calculated_price } = item.variant
        ? (getPricesForVariant(item.variant) ?? {})
        : {};

      return (
        <Products
          isPending={isPending}
          queueUpdate={queueUpdate}
          itemId={item.id}
          name={item.product_title}
          color={item.variant?.title ? item.variant.title : undefined}
          image={
            item.variant?.product?.thumbnail && (
              <div className="relative h-full w-28">
                <Image
                  src={item.variant.product.thumbnail}
                  alt="XXX product"
                  className="h-full w-full object-cover"
                  fill
                />
              </div>
            )
          }
          price={original_price!}
          originalPrice={
            original_price !== calculated_price ? calculated_price : undefined
          }
          amount={item.quantity}
          maxAmount={
            item.variant?.inventory_quantity || Number.MAX_SAFE_INTEGER
          }
          key={i}
        />
      );
    })
  ) : (
    <p className="text-md">Currently you have not ordered anything</p>
  );
});
