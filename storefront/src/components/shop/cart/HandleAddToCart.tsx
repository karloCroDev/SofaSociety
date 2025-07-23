'use client';

// External packages
import * as React from 'react';

// Components
import { AddToCart } from '@/components/shop/AddToCart';

// Hooks
import { useUpdateLineItem } from '@/hooks/cart';

// lib
import { withReactQueryProvider } from '@/lib/util/react-query';

export const HandleAddToCart: React.FC<{
  itemId: string;
  amount: number;
  maxAmount: number;
}> = withReactQueryProvider(({ amount, itemId, maxAmount }) => {
  const { mutate, isPending } = useUpdateLineItem();

  return (
    <AddToCart
      className="mt-auto !w-fit"
      maxValue={maxAmount}
      onChange={(value) => {
        mutate({
          lineId: itemId,
          quantity: value as number,
        });
      }}
      defaultValue={amount}
      isDisabled={isPending}
    />
  );
});
