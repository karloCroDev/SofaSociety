'use client';

// External packages
import {
  Button as AriaButton,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';

export const LanguageSelect = () => (
  <Select defaultSelectedKey="croatian" aria-label="visible">
    <AriaButton className="outline-none">
      <div className="flex gap-2">
        <SelectValue className="uppercase">
          {({ defaultChildren }) => defaultChildren?.toString().slice(0, 3)}
        </SelectValue>
        <Icon name="chevron" />
      </div>
    </AriaButton>
    <Popover
      placement="bottom"
      className="relative z-[10000000] h-52 w-60 overflow-scroll rounded border border-gray-900 bg-gray-10"
    >
      <ListBox>
        <ListBoxItem id="afghanistan" className="cursor-pointer p-4 outline-0">
          afghanistan
        </ListBoxItem>
        <ListBoxItem id="albania" className="z-10 cursor-pointer p-4 outline-0">
          albania
        </ListBoxItem>
        <ListBoxItem id="algeria" className="z-10 cursor-pointer p-4 outline-0">
          algeria
        </ListBoxItem>
        <ListBoxItem id="andorra" className="z-10 cursor-pointer p-4 outline-0">
          andorra
        </ListBoxItem>
        <ListBoxItem
          id="croatian"
          className="z-10 cursor-pointer p-4 outline-0"
        >
          croatian
        </ListBoxItem>
        <ListBoxItem id="english" className="z-10 cursor-pointer p-4 outline-0">
          english
        </ListBoxItem>
      </ListBox>
    </Popover>
  </Select>
);
