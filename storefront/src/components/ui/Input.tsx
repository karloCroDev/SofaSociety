'use client';

// External packages
import * as React from 'react';
import {
  TextField,
  TextFieldProps,
  Input as AriaInput,
  InputProps,
  Label,
  FieldError,
  FieldErrorProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export const Input: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    TextFieldProps & {
      label: string;
      inputProps?: React.ComponentPropsWithoutRef<'input'> & InputProps;
      fieldErrorProps?: FieldErrorProps;
    }
> = ({ label, inputProps, fieldErrorProps, className }) => {
  return (
    <TextField
      className={twMerge(
        'w-full text-base text-gray-400 outline-none',
        className
      )}
    >
      <div className="relative">
        <AriaInput
          {...inputProps}
          className={twMerge(
            'peer h-14 w-full rounded border border-gray-200 px-4 pt-3 text-gray-900 outline-none placeholder-shown:pt-0 hover:border-gray-500 focus:border-gray-500 data-[invalid]:border-red-400',
            inputProps?.className
          )}
          placeholder=""
        />
        <Label className="absolute left-4 top-1/2 origin-left -translate-y-[22px] scale-75 transition-transform peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100">
          {label}
        </Label>
      </div>
      <FieldError
        {...fieldErrorProps}
        className={twMerge(
          'text-2xs w-full text-red-400',
          typeof fieldErrorProps?.className === 'string'
            ? fieldErrorProps.className
            : undefined
        )}
      />
    </TextField>
  );
};
