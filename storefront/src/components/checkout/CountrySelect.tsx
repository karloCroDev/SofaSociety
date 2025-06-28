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

// Components
import { Icon } from '@/components/ui/Icon';

export const CountrySelect = () => {
  return (
    <Select className="relative" defaultSelectedKey="croatia">
      <AriaButton className="relative flex w-full items-center justify-between rounded border border-gray-50 px-4 outline-none">
        <SelectValue className="pb-3 pt-6" />
        <Icon name="chevron" />
        <label className="absolute left-2 top-1.5 scale-75 text-gray-400">
          Country
        </label>
      </AriaButton>
      <Popover className="max-h-[360px] overflow-scroll rounded border bg-gray-10 px-4 outline-none data-[trigger=Select]:w-[var(--trigger-width)]">
        <ListBox className="w-full hover:cursor-pointer">
          <ListBoxItem
            className="border-0 border-b py-4 outline-none"
            id="croatia"
          >
            Croatia
          </ListBoxItem>
          <ListBoxItem
            className="border-0 border-b py-4 outline-none"
            id="germany"
          >
            Germany
          </ListBoxItem>
          <ListBoxItem className="border-0 py-4 outline-none">
            Italy
          </ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  );
};
