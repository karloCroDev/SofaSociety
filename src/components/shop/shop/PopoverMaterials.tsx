'use client';

// External packages
import {
  Dialog,
  DialogTrigger,
  Popover,
  CheckboxGroup,
} from 'react-aria-components';

// Components
import { CheckboxWithLabel } from '@/components/ui/Checkbox';
import { FilterButton } from '@/components/shop/shop/FilterButton';
import { Icon } from '@/components/ui/Icon';

export const PopoverMaterials = () => {
  return (
    <DialogTrigger>
      <FilterButton
        iconRight={
          <Icon name="chevron" className="size-4 text-gray-500 lg:size-6" />
        }
      >
        Materials
      </FilterButton>
      <Popover placement="bottom left">
        <Dialog className="w-60 rounded border border-gray-200 bg-gray-10 p-4 outline-none">
          <CheckboxGroup className="flex flex-col gap-8">
            <CheckboxWithLabel value="velvet">Velvet</CheckboxWithLabel>
            <CheckboxWithLabel value="linen">Linen</CheckboxWithLabel>
            <CheckboxWithLabel value="boucle">Boucle</CheckboxWithLabel>
            <CheckboxWithLabel value="leather">Leather</CheckboxWithLabel>
          </CheckboxGroup>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
