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
            <Checkbox className="group flex items-center gap-2" value="velvet">
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Velevet</p>
            </Checkbox>
            <Checkbox className="group flex items-center gap-2" value="linen">
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Linen</p>
            </Checkbox>
            <Checkbox className="group flex items-center gap-2" value="boucle">
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Boucle</p>
            </Checkbox>
            <Checkbox className="group flex items-center gap-2" value="leather">
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Leather</p>
            </Checkbox>
          </CheckboxGroup>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
