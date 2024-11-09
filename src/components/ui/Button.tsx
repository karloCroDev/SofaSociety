'use client';
// External packages
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export const Button: React.FC<
  AriaButtonProps &
    React.ComponentPropsWithoutRef<'button'> & {
      variant?: 'primary' | 'outline';
      colorScheme?: 'black' | 'white';
      size?: 'sm' | 'lg';
      isVisuallyDisabled?: boolean;
    }
> = ({
  colorScheme = 'black',
  variant = 'primary',
  size = 'sm',
  isVisuallyDisabled = false,
  children,
  className,
  ...rest
}) => (
  <AriaButton
    {...rest}
    className={twMerge(
      'rounded text-center outline-none',
      size === 'sm' ? 'px-4 text-sm leading-8' : 'leading-12 px-6',

      // Primary variant styles
      variant === 'primary' &&
        colorScheme === 'black' &&
        (isVisuallyDisabled
          ? 'cursor-not-allowed bg-gray-200 text-gray-10'
          : 'bg-gray-900 text-gray-10 hover:bg-gray-500'),

      // Outline variant styles for black and white color schemes
      variant === 'outline' && 'border',
      variant === 'outline' &&
        colorScheme === 'black' &&
        (isVisuallyDisabled
          ? 'cursor-not-allowed border-gray-200 text-gray-200'
          : 'border-gray-900 text-gray-900 hover:border-gray-500 hover:text-gray-500'),
      variant === 'outline' &&
        colorScheme === 'white' &&
        (isVisuallyDisabled
          ? 'cursor-not-allowed border-gray-500 text-gray-500'
          : 'border-gray-10 text-gray-10 hover:border-gray-200 hover:text-gray-200'),

      className
    )}
  >
    {children}
  </AriaButton>
);
