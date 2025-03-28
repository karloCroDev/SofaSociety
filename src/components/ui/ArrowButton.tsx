'use client';

// External packages
import { Button as AriaButton, ButtonProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

// Components
import { Icon } from '@/components/ui/Icon';

// TODO: Ovo bi preimenova u `IconButton` i dao bi korisniku mogućnost da sam proslijedi ikonu kao ReactNode kroz `children` prop.

export const ArrowButton: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    ButtonProps & { variation?: 'solid' | 'outline'; direction?: 'right' }
> = ({ variation = 'solid', direction, className, ...rest }) => (
  <AriaButton
    {...rest}
    className={twMerge(
      'rounded-full p-2 outline-none',
      variation === 'solid' && 'bg-gray-900 text-gray-10',
      variation === 'outline' && 'border border-gray-900 text-gray-900',
      direction === 'right' && 'rotate-180',
      className
    )}
  >
    <Icon name="arrow" />
  </AriaButton>
);
