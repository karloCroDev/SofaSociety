// External packages
import { twMerge } from 'tailwind-merge';

// Components
import {
  AdditionalButtonProps,
  getButtonClassNames,
} from '@/components/ui/LinkAsButton';

export const AnchorAsButton: React.FC<
  React.ComponentPropsWithoutRef<'a'> & AdditionalButtonProps
> = ({
  colorScheme = 'black',
  variant = 'primary',
  size = 'sm',
  isVisuallyDisabled = false,
  iconLeft,
  iconRight,

  children,
  className,
  ...rest
}) => (
  <a
    {...rest}
    className={twMerge(
      getButtonClassNames({ colorScheme, size, isVisuallyDisabled, variant }),
      className
    )}
  >
    {iconLeft}
    {children}
    {iconRight}
  </a>
);
