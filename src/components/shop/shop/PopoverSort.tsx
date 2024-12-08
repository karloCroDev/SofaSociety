'use client';

// External packages
import {
  Dialog,
  DialogTrigger,
  Popover,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
} from 'react-aria-components';

// Components
import { CheckboxVisually } from '@/components/ui/CheckboxVisually';
import { FilterButton } from '@/components/shop/shop/FilterButton';
import { Icon } from '@/components/ui/Icon';

export const PopoverSort = () => {
  return (
    <DialogTrigger>
      <FilterButton
        iconRight={
          <Icon name="chevron" className="size-4 text-gray-500 lg:size-6" />
        }
      >
        Sort by
      </FilterButton>
      <Popover placement="bottom right">
        <Dialog className="w-64 rounded border border-gray-200 bg-gray-10 p-4 outline-none">
          <RadioGroup className="flex flex-col gap-8">
            <Radio value="featured" className="data-[selected]:font-bold">
              Featured
            </Radio>
            <Radio value="best-selling" className="data-[selected]:font-bold">
              Best selling
            </Radio>
            <Radio value="lowest-price" className="data-[selected]:font-bold">
              Lowest price
            </Radio>
            <Radio value="highest-price" className="data-[selected]:font-bold">
              Highest price
            </Radio>
          </RadioGroup>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
