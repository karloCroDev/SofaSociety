// External packages
import Link, { LinkProps } from 'next/link';
import { twJoin, twMerge } from 'tailwind-merge';

export interface AdditionalButtonProps {
  variant?: 'primary' | 'outline';
  colorScheme?: 'black' | 'white';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  size?: 'sm' | 'lg';
  isVisuallyDisabled?: boolean;
}

export const getButtonClassNames = ({
  variant,
  colorScheme,
  size,
  isVisuallyDisabled,
}: {
  size: AdditionalButtonProps['size'];
  colorScheme: AdditionalButtonProps['colorScheme'];
  variant: AdditionalButtonProps['variant'];
  isVisuallyDisabled: AdditionalButtonProps['isVisuallyDisabled'];
}): string =>
  twJoin(
    'rounded text-center outline-none block justify-center flex items-center gap-2',
    size === 'sm' && 'px-4  leading-10',
    size === 'lg' && 'px-6 text-lg leading-12',

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
        : 'border-gray-10 text-gray-10 hover:border-gray-200 hover:text-gray-200')
  );

export const LinkAsButton: React.FC<
  React.ComponentPropsWithoutRef<'a'> & LinkProps & AdditionalButtonProps
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
  <Link
    {...rest}
    className={twMerge(
      getButtonClassNames({ colorScheme, size, isVisuallyDisabled, variant }),
      className
    )}
  >
    {children}
  </Link>
);
