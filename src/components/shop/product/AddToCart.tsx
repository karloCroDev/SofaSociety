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
      <div className="mt-8 flex flex-col justify-between gap-4 lg:mt-auto lg:flex-row">
        <div className="flex h-12 w-full items-center justify-center gap-4 rounded border border-gray-200 px-4 lg:w-auto">
          <Icon
            name="minus"
            className="cursor-pointer text-gray-500"
            onClick={() => setItemCount((prev) => prev - 1)}
          />
          <p className="w-4 text-center text-md">{itemCount}</p>
          <Icon
            name="plus"
            className="cursor-pointer"
            onClick={() => setItemCount((prev) => prev + 1)}
          />
        </div>
        <Button size="lg" className="flex-1">
          Add to cart
        </Button>
      </div>
      <p className="mt-4 text-gray-500">Estimate delivery 2-3 days</p>
    </>
  );
};
