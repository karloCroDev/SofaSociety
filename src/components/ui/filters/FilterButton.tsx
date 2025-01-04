'use client';

// Etxernal packages
import * as React from 'react';
import { Button, ButtonProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export const FilterButton: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    ButtonProps & {
      iconRight?: React.ReactNode;
    }
> = ({ iconRight, children, className, ...rest }) => {
  return (
    <Button
      {...rest}
      className={twMerge(
        'flex h-8 items-center gap-2 rounded border border-gray-200 px-4 text-sm outline-none lg:h-10 lg:text-base',
        className
      )}
    >
      {children}
      {iconRight}
    </Button>
  );
};
