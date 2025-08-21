'use client';

// External packages
import * as React from 'react';

// Components
import { AddToCart } from '@/components/shop/AddToCart';

// Hooks
import { useUpdateCartItem } from '@/hooks/cart';

// lib
import { withReactQueryProvider } from '@/lib/config/react-query';

export const HandleAddToCart: React.FC<{
  itemId: string;
  amount: number;
  maxAmount: number;
}> = withReactQueryProvider(({ amount, itemId, maxAmount }) => {
  const { mutate, isPending } = useUpdateCartItem();

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
      defaultValue={amount}
      isDisabled={isPending}
    />
  );
});
