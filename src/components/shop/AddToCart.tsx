'use client';

// Etxernal packages
import * as React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

// Components
import { Icon } from '@/components/ui/Icon';

export const AddToCart: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    size?: 'sm' | 'lg';
  }
> = ({ size = 'sm', className, ...rest }) => {
  const [itemCount, setItemCount] = React.useState(1);
  return (
    <div
      {...rest}
      className={twMerge(
        'flex items-center justify-center rounded border border-gray-200 px-4 py-3 lg:w-auto',
        size === 'sm' && 'gap-2',
        size === 'lg' && 'w-full gap-4',
        className
      )}
    >
      <Icon
        name="minus"
        className={twJoin(
          'cursor-pointer text-gray-500',
          size === 'sm' && 'size-4'
        )}
        onClick={() => {
          if (itemCount === 1) return;
          setItemCount((prev) => prev - 1);
        }}
      />
      <p className="text-center">{itemCount}</p>
      <Icon
        name="plus"
        className={twJoin(
          'size-4 cursor-pointer lg:size-6',
          size === 'sm' && 'size-4'
        )}
        onClick={() => setItemCount((prev) => prev + 1)}
      />
    </div>
  );
};
