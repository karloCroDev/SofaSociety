'use client';

// External packages
import { Checkbox as AriaCheckbox, CheckboxProps } from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';

export const Checkbox: React.FC<
  React.ComponentPropsWithoutRef<'div'> & CheckboxProps
> = ({ className, ...rest }) => {
  return (
    <AriaCheckbox
      {...rest}
      className="group flex h-4 w-4 cursor-pointer items-center justify-center border border-gray-200 hover:border-gray-600 data-[selected]:border-0 data-[selected]:bg-gray-900 data-[selected]:text-gray-10 hover:data-[selected]:bg-gray-600"
    >
      <Icon
        name="checkmark"
        className="h-3 w-3 opacity-0 group-data-[selected]:opacity-100"
      />
    </AriaCheckbox>
  );
};
