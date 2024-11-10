'use client';

// External packages
import { Button as AriaButton, ButtonProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

// Components
import {
  AdditionalButtonProps,
  getButtonClassNames,
} from '@/components/ui/LinkAsButton';

export const Button: React.FC<
  React.ComponentPropsWithoutRef<'button'> & ButtonProps & AdditionalButtonProps
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
      getButtonClassNames({ size, variant, colorScheme, isVisuallyDisabled }),
      className
    )}
  >
    {children}
  </AriaButton>
);
