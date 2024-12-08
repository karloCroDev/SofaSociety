'use client';

// External packages
import {
  Dialog,
  DialogTrigger,
  Popover,
  SliderProps,
  CheckboxGroup,
  Checkbox,
} from 'react-aria-components';

// Components
import { CheckboxVisually } from '@/components/ui/CheckboxVisually';
import { FilterButton } from '@/components/shop/shop/FilterButton';
import { Icon } from '@/components/ui/Icon';

export const PopoverCollection: React.FC<SliderProps> = () => {
  return (
    <DialogTrigger>
      <FilterButton
        iconRight={
          <Icon name="chevron" className="size-4 text-gray-500 lg:size-6" />
        }
      >
        Color
      </FilterButton>
      <Popover placement="bottom left">
        <Dialog className="w-60 rounded border border-gray-200 bg-gray-10 p-4 outline-none">
          <CheckboxGroup className="flex flex-col gap-8">
            <Checkbox
              className="group flex items-center gap-2"
              value="scadinavian simplicity"
            >
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">
                Scandinavian Simplicity
              </p>
            </Checkbox>
            <Checkbox
              className="group flex items-center gap-2"
              value="modern luxe"
            >
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Modern luxe</p>
            </Checkbox>
            <Checkbox
              className="group flex items-center gap-2"
              value="boho chic"
            >
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">Boho chic</p>
            </Checkbox>
            <Checkbox
              className="group flex items-center gap-2"
              value="timeless classics"
            >
              <CheckboxVisually />
              <p className="group-data-[selected]:font-bold">
                Timeless classics
              </p>
            </Checkbox>
          </CheckboxGroup>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
