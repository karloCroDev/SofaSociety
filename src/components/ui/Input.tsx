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
  const labelRef = React.useRef(null);

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
          className="peer absolute left-4 top-1/2 origin-left -translate-y-1/2 transition-transform data-[label-floating=true]:-translate-y-[22px] data-[label-floating=true]:scale-75"
        >
          {label}
        </Label>
        <AriaInput
          {...inputProps}
          className={twMerge(
            'border-grayscale-200 text-grayscale-900 h-14 w-full border px-4 text-gray-900 outline-none hover:border-gray-500 focus:border-gray-500 data-[invalid]:border-red-400 peer-data-[label-floating=true]:pt-3',
            inputProps?.className
          )}
          onChange={(event) => {
            const value = event.target.value;
            const labelElement = labelRef.current as HTMLLabelElement | null;
            if (labelElement !== null) {
              if (value === '') {
                labelElement.setAttribute('data-label-floating', 'false');
              } else {
                labelElement.setAttribute('data-label-floating', 'true');
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
