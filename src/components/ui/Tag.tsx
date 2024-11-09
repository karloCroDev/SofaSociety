// External packages
import { twMerge } from 'tailwind-merge';

export const Tag: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    colorScheme?: 'black' | 'yellow' | 'gray' | 'red';
  }
> = ({ colorScheme = 'black', children, className, ...rest }) => (
  <div
    {...rest}
    className={twMerge(
      'w-fit rounded-full px-4 text-center leading-6',
      colorScheme === 'black' && 'bg-gray-900 text-gray-100',
      colorScheme === 'yellow' && 'bg-yellow-400 text-gray-500',
      colorScheme === 'gray' && 'text-grayscale-200 bg-gray-50',
      colorScheme === 'red' && 'bg-red-700 text-gray-10',
      className
    )}
  >
    {children}
  </div>
);
