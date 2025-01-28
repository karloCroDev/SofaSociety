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
  const labelRef = React.useRef<HTMLLabelElement | null>(null);

  return (
    <TextField
      className={twMerge(
        'w-full text-base text-gray-400 outline-none',
        className
      )}
    >
      <div className="relative">
        <Label
          ref={labelRef}
          className="peer absolute left-4 top-1/2 origin-left -translate-y-1/2 transition-transform data-[label-floating]:-translate-y-[22px] data-[label-floating]:scale-75"
        >
          {label}
        </Label>
        <AriaInput
          {...inputProps}
          className={twMerge(
            'h-14 w-full rounded border border-gray-200 px-4 text-gray-900 outline-none hover:border-gray-500 focus:border-gray-500 data-[invalid]:border-red-400 peer-data-[label-floating]:pt-3',
            inputProps?.className
          )}
          onChange={(event) => {
            const value = event.target.value;
            const labelElement = labelRef.current;
            if (labelElement) {
              if (value === '') {
                labelElement.removeAttribute('data-label-floating');
              } else {
                labelElement.setAttribute('data-label-floating', '');
              }
            }
          }}
        />
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
