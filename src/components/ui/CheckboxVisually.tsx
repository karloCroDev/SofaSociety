'use client';

// Components
import { Icon } from '@/components/ui/Icon';

export const CheckboxVisually: React.FC<
  React.ComponentPropsWithoutRef<'div'>
> = ({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className="flex h-4 w-4 cursor-pointer items-center justify-center border border-gray-200 hover:border-gray-600 group-data-[selected]:border-0 group-data-[selected]:bg-gray-900 group-data-[selected]:text-gray-10 hover:group-data-[selected]:bg-gray-600"
    >
      <Icon
        name="checkmark"
        className="h-3 w-3 opacity-0 group-data-[selected]:opacity-100"
      />
    </div>
  );
};
