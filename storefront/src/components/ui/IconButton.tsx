'use client';

// External packages
import { Button as AriaButton, ButtonProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export const IconButton: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    ButtonProps & { variation?: 'solid' | 'outline' }
> = ({ variation = 'solid', children, className, ...rest }) => (
  <AriaButton
    {...rest}
    className={twMerge(
      'rounded-full p-2 outline-none',
      variation === 'solid' && 'bg-gray-900 text-gray-10',
      variation === 'outline' && 'border border-gray-900 text-gray-900',
      className
    )}
  >
    {children}
  </AriaButton>
);
