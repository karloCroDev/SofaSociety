'use client';

// External packages
import * as React from 'react';
import {
  Button as AriaButton,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';
import { SelectColor } from '@/components/shop/product/SelectColor';

export const SelectMaterial = () => {
  const [material, setMaterial] = React.useState('');

  return (
    <>
      <div className="mt-8 flex lg:mt-16">
        <p>Materials</p>
        <p className="ml-6 text-gray-500">
          {material && material[0].toUpperCase() + material.slice(1)}
        </p>
      </div>
      <AriaSelect
        className="relative"
        onSelectionChange={(e) => setMaterial(e.toString())}
      >
        <AriaButton className="relative mt-4 flex h-12 w-full max-w-64 items-center justify-between rounded border border-gray-200 px-4 outline-none">
          <SelectValue className="data-[placeholder]:text-gray-500">
            {({ defaultChildren, isPlaceholder }) =>
              isPlaceholder ? 'Choose material' : defaultChildren
            }
          </SelectValue>
          <Icon name="chevron" className="text-gray-500" />
        </AriaButton>
        <Popover className="bg-grayscale-10 max-h-[448px] w-[var(--trigger-width)] overflow-scroll rounded border bg-gray-10 outline-none">
          <ListBox className="w-full hover:cursor-pointer">
            <ListBoxItem
              id="velvet"
              className="p-4 outline-none data-[selected]:bg-gray-50 data-[selected]:font-bold"
            >
              Velvet
            </ListBoxItem>
            <ListBoxItem
              id="linen"
              className="p-4 outline-none data-[selected]:bg-gray-50 data-[selected]:font-bold"
            >
              Linen
            </ListBoxItem>
            <ListBoxItem
              id="boucle"
              className="p-4 outline-none data-[selected]:bg-gray-50 data-[selected]:font-bold"
            >
              Boucle
            </ListBoxItem>
            <ListBoxItem
              id="leather"
              className="p-4 outline-none data-[selected]:bg-gray-50 data-[selected]:font-bold"
            >
              Leather
            </ListBoxItem>
          </ListBox>
        </Popover>
      </AriaSelect>
      {material && <SelectColor />}
    </>
  );
};
