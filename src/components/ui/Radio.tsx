// External packages
import { twMerge } from 'tailwind-merge';

export const RadioIconVisual: React.FC<
  React.ComponentPropsWithoutRef<'div'>
> = ({ className, ...rest }) => {
  return (
    <div
      {...rest}
      className={twMerge(
        'border-grayscale-900 group-data-[selected]:border-6 h-4 w-4 cursor-pointer rounded-full border border-gray-200 hover:!border-gray-600 group-data-[selected]:border-gray-900',
        className
      )}
    />
  );
};

export const RadioButtonVisual: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    additionalLabel: string;
  }
> = ({ additionalLabel, children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={twMerge(
        'flex h-14 items-center px-4',
        'border-grayscale-900 min-w-56 cursor-pointer border border-gray-200 hover:!border-gray-400 group-data-[selected]:border-gray-200',
        className
      )}
    >
      <RadioIconVisual className="mr-4" />
      {children}
      <p className="ml-auto">{additionalLabel}</p>
    </div>
  );
};
