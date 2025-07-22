// TODO: Za ovo imaš `NumberField` u `react-aria-components` paketu: https://react-spectrum.adobe.com/react-aria/NumberField.html FIXED

'use client';

// Etxernal packages
import * as React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import {
  Group,
  NumberField,
  NumberFieldProps,
  Button,
  Input,
} from 'react-aria-components';
import { getCartQuantity } from '@/lib/data/cart';

export const AddToCart: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    NumberFieldProps & {
      size?: 'sm' | 'lg';
      setAmount: React.Dispatch<React.SetStateAction<number>>;
    }
> = ({ size = 'sm', setAmount, className, ...rest }) => {
  return (
    <NumberField
      {...rest}
      defaultValue={1}
      minValue={1}
      maxValue={10}
      className={twMerge(
        'flex items-center justify-center rounded border border-gray-200 px-4',
        size === 'lg' && 'h-12',
        size === 'sm' && 'h-8',
        className
      )}
      onChange={(val) => {
        setAmount(val);
      }}
    >
      <Group
        className={twJoin(
          'flex items-center justify-center text-lg',
          size === 'sm' && 'gap-2',
          size === 'lg' && 'gap-4'
        )}
      >
        <Button
          slot="decrement"
          className={twJoin(
            'cursor-pointer text-gray-500',
            size === 'lg' && 'text-lg'
          )}
        >
          -
        </Button>
        <Input className="!w-8 text-center outline-none" />

        <Button
          slot="increment"
          className={twJoin(
            'cursor-pointer text-gray-500',
            size === 'lg' && 'text-lg'
          )}
        >
          +
        </Button>
      </Group>
    </NumberField>
  );
};
