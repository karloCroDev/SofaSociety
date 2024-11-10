'use client';

// External packages
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

// Components
import {
  AdditionalButtonProps,
  getButtonClassNames,
} from '@/components/ui/LinkAsButton';

export const Button: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    AriaButtonProps &
    AdditionalButtonProps
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
