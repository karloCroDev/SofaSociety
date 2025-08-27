'use client';

// External packages
import * as React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import {
  Group,
  NumberField,
  NumberFieldProps,
  Button,
  Input,
} from 'react-aria-components';

export const AddToCart: React.FC<
  NumberFieldProps &
    React.ComponentPropsWithoutRef<'div'> & {
      size?: 'sm' | 'lg';
      setAmount?: React.Dispatch<React.SetStateAction<number>>;
      isPending?: boolean;
    }
> = ({
  size = 'sm',
  setAmount,
  className,
  defaultValue,
  isPending,
  onChange,
  ...rest
}) => {
  return (
    <NumberField
      {...rest}
      defaultValue={defaultValue ?? 1}
      minValue={1}
      className={twMerge(
        'flex items-center justify-center rounded border border-gray-200 px-4',
        size === 'lg' && 'h-12',
        size === 'sm' && 'h-8',
        className
      )}
      onChange={setAmount ? (val) => setAmount(val) : onChange}
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
            isPending && 'disabled:cursor-not-allowed disabled:text-red-900',
            size === 'lg' && 'text-lg'
          )}
          isDisabled={isPending} // Ante: Je li ovako oke, ili trebam jos dodatno debounceati?
        >
          -
        </Button>
        <Input className="!w-8 bg-inherit text-center outline-none" />

        <Button
          slot="increment"
          className={twJoin(
            'cursor-pointer text-gray-500',
            isPending && 'disabled:cursor-not-allowed disabled:text-red-900',
            size === 'lg' && 'text-lg'
          )}
          isDisabled={isPending}
        >
          +
        </Button>
      </Group>
    </NumberField>
  );
};
