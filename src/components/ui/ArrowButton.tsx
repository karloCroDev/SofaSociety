'use client';

// External packages
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

// Components
import { Icon } from '@/components/ui/Icon';

export const ArrowButton: React.FC<
  AriaButtonProps &
    React.ComponentPropsWithoutRef<'button'> & {
      variation?: 'solid' | 'outline';
      direction?: 'right';
    }
> = ({ variation = 'solid', direction, className, ...rest }) => (
  <AriaButton
    {...rest}
    className={twMerge(
      'rounded-full p-2 outline-none',
      variation === 'solid' && 'bg-gray-900 text-gray-10',
      variation === 'outline' && 'border border-gray-900 text-gray-900',
      direction === 'right' && 'rotate-180', // Default position of svg is left
      className
    )}
  >
    <Icon name="arrow" />
  </AriaButton>
);