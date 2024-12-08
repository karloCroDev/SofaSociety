'use client';

// External packages
import {
  Dialog,
  DialogTrigger,
  Popover,
  CheckboxGroup,
  Checkbox,
} from 'react-aria-components';

// Components
import { CheckboxVisually } from '@/components/ui/CheckboxVisually';
import { FilterButton } from '@/components/shop/shop/FilterButton';
import { Icon } from '@/components/ui/Icon';

export const PopoverColor = () => {
  return (
    <DialogTrigger>
      <FilterButton
        iconRight={
          <Icon name="chevron" className="size-4 text-gray-500 lg:size-6" />
        }
      >
        Collection
      </FilterButton>
      <Popover placement="bottom left">
        <Dialog className="w-64 rounded border border-gray-200 bg-gray-10 p-4 outline-none">
          <CheckboxGroup className="flex flex-col gap-8">
            <Checkbox className="group flex items-center gap-2" value="black">
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Black</p>
            </Checkbox>
            <Checkbox className="group flex items-center gap-2" value="gray">
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Gray</p>
            </Checkbox>
            <Checkbox className="group flex items-center gap-2" value="yellow">
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Yellow</p>
            </Checkbox>
            <Checkbox className="group flex items-center gap-2" value="red">
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Red</p>
            </Checkbox>
          </CheckboxGroup>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
