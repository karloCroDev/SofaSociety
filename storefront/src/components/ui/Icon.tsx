// External packages
import { twMerge } from 'tailwind-merge';

// Components
import * as Icons from '@/components/icons';

export type IconNames =
  | 'search'
  | 'user'
  | 'heart'
  | 'bag'
  | 'chevron'
  | 'minus'
  | 'plus'
  | 'info'
  | 'arrow'
  | 'arrow-up'
  | 'bin'
  | 'truck'
  | 'calendar'
  | 'map'
  | 'receipt'
  | 'checkmark'
  | 'package'
  | 'credit-card'
  | 'paypal'
  | 'undo'
  | 'hamburger'
  | 'close';

const baseClasses = 'w-6 h-6 flex-shrink-0';

export const Icon: React.FC<
  React.ComponentPropsWithoutRef<'svg'> & {
    name: IconNames;
  }
> = ({ name, className, ...rest }) => (
  <>
    {name === 'search' && (
      <Icons.Search {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'user' && (
      <Icons.User {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'heart' && (
      <Icons.Heart {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'bag' && (
      <Icons.Bag {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'chevron' && (
      <Icons.Chevron {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'minus' && (
      <Icons.Minus {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'plus' && (
      <Icons.Plus {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'info' && (
      <Icons.Info {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'arrow' && (
      <Icons.Arrow {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'arrow-up' && (
      <Icons.ArrowUp {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'bin' && (
      <Icons.Bin {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'truck' && (
      <Icons.Truck {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'calendar' && (
      <Icons.Calendar {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'map' && (
      <Icons.Map {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'receipt' && (
      <Icons.Receipt {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'checkmark' && (
      <Icons.Checkmark {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'package' && (
      <Icons.Package {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'credit-card' && (
      <Icons.CreditCard {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'undo' && (
      <Icons.Undo {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'close' && (
      <Icons.Close {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'hamburger' && (
      <Icons.Hamburger {...rest} className={twMerge(baseClasses, className)} />
    )}
    {name === 'paypal' && (
      <Icons.Paypal {...rest} className={twMerge(baseClasses, className)} />
    )}
  </>
);
