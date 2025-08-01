'use client';

// External packages
import {
  Button as AriaButton,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
  Select,
} from 'react-aria-components';
import { HttpTypes } from '@medusajs/types';

// Components
import { Icon } from '@/components/ui/Icon';

export const CountrySelect: React.FC<{
  regions?: HttpTypes.StoreRegion[];
  userRegion?: HttpTypes.StoreRegion;
  value?: string;
  onChange?: (val: string) => void;
}> = ({ regions, userRegion, value, onChange }) => {
  return (
    <Select
      className="relative"
      selectedKey={value || userRegion?.countries?.[0]?.display_name}
      onSelectionChange={(key) => {
        if (typeof key === 'string' && onChange) onChange(key);
      }}
    >
      <AriaButton className="relative flex w-full items-center justify-between rounded border border-gray-200 px-4 outline-none">
        <SelectValue className="pb-3 pt-6" />
        <Icon name="chevron" />
        <label className="absolute left-2 top-1.5 scale-75 text-gray-400">
          Country
        </label>
      </AriaButton>
      <Popover className="max-h-[360px] overflow-scroll rounded border bg-gray-10 px-4 outline-none data-[trigger=Select]:w-[var(--trigger-width)]">
        <ListBox className="w-full hover:cursor-pointer">
          {regions?.flatMap(
            (region) =>
              region.countries &&
              region.countries.map((country) => (
                <ListBoxItem
                  key={country.display_name}
                  className="flex items-center gap-2 py-2 outline-none"
                  textValue={country.display_name}
                  id={country.display_name} // Check if this code is correct
                >
                  {country.display_name}
                </ListBoxItem>
              ))
          )}
        </ListBox>
      </Popover>
    </Select>
  );
};
