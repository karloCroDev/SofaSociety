'use client';

// External packages
import * as React from 'react';

// Components
import { AddToCart } from '@/components/shop/AddToCart';

// lib
import { withReactQueryProvider } from '@/lib/config/react-query';
import { TQueueUpdate } from '@/components/shop/cart/ItemMapping';

export const CartItemPicker: React.FC<{
  itemId: string;
  amount: number;
  maxAmount: number;
  queueUpdate: TQueueUpdate;
  isPending: boolean;
}> = withReactQueryProvider(
  ({ amount, itemId, maxAmount, queueUpdate, isPending }) => {
    return (
      <AddToCart
        className="mt-auto !w-fit"
        maxValue={maxAmount}
        onChange={(value) => {
          console.log(value);
          queueUpdate({
            lineItemId: itemId,
            quantity: value as number,
          });
        }}
        isPending={isPending}
        defaultValue={amount}
      />
    );
  }
);
