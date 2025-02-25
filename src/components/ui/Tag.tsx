// External packages
import { twMerge } from 'tailwind-merge';

export const Tag: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    colorScheme?: 'black' | 'yellow' | 'gray' | 'red';
  }
> = ({
  iconLeft,
  iconRight,
  colorScheme = 'black',
  children,
  className,
  ...rest
}) => (
  <div
    {...rest}
    className={twMerge(
      'flex h-6 w-fit items-center gap-2 rounded-full px-4 text-center text-sm',
      colorScheme === 'black' && 'bg-gray-900 text-gray-100',
      colorScheme === 'yellow' && 'bg-yellow-400 text-gray-500',
      colorScheme === 'gray' && 'bg-gray-50 text-gray-200',
      colorScheme === 'red' && 'bg-red-700 text-gray-10',
      className
    )}
  >
    {iconLeft}
    {children}
    {iconRight}
  </div>
);
