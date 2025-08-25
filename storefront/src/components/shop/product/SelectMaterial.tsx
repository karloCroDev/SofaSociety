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
import { HttpTypes } from '@medusajs/types';

// Components
import { Icon } from '@/components/ui/Icon';

export const SelectMaterial: React.FC<{
  customization: {
    id: string;
    name: string;
    colors: {
      id: string;
      name: string;
      hex_code: string;
    }[];
  }[];
  materialOption: HttpTypes.StoreProductOption;
  setProductOptions: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
}> = ({ customization, setProductOptions, materialOption }) => {
  const [material, setMaterial] = React.useState(
    customization.length === 1 ? customization[0].name : undefined
  );

  React.useEffect(() => {
    if (customization.length !== 1) return;
    setProductOptions((prev) => ({
      ...prev,
      [materialOption.id]: customization[0].name,
    }));
  }, []);

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
        defaultSelectedKey={
          customization.length === 1 ? customization[0].name : undefined
        }
        onSelectionChange={(val) => {
          setMaterial(val.toString());
          setProductOptions((prev) => ({
            ...prev,
            [materialOption.id]: val.toString(),
          }));
        }}
      >
        <AriaButton className="relative mt-4 flex h-12 w-full max-w-64 items-center justify-between rounded border border-gray-200 px-4 outline-none">
          <SelectValue className="data-[placeholder]:text-gray-500">
            {({ defaultChildren, isPlaceholder }) =>
              isPlaceholder ? 'Choose material' : defaultChildren
            }
          </SelectValue>
          <Icon name="chevron" className="text-gray-500" />
        </AriaButton>
        <Popover className="max-h-[448px] w-[var(--trigger-width)] overflow-scroll rounded border bg-gray-10 outline-none">
          <ListBox className="w-full hover:cursor-pointer">
            {customization.map((material) => (
              <ListBoxItem
                id={material.name}
                className="p-4 outline-none data-[selected]:bg-gray-50 data-[selected]:font-bold"
                key={material.id}
              >
                {material.name}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </AriaSelect>
    </>
  );
};
