'use client';

// Etxernal packages
import * as React from 'react';

// Components
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export const AddToCart = () => {
  const [itemCount, setItemCount] = React.useState(1);
  return (
    <>
      <div className="mt-auto flex justify-between">
        <div className="flex h-full items-center gap-4 rounded border border-gray-200 p-4">
          <Icon name="minus" className="text-gray-500" />
          <p className="text-md">{itemCount}</p>
          <Icon name="plus" />
        </div>
        <Button size="lg" className="ml-4 flex-1">
          Add to cart
        </Button>
      </div>
      <p className="mt-4 text-gray-500">Estimate delivery 2-3 days</p>
    </>
  );
};
