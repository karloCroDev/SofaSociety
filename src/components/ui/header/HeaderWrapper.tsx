'use client';

// External packages
import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import {
  Button as AriaButton,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import Link from 'next/link';

// Components
import { Header } from '@/components/ui/header/Header';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';

export const HeaderWrapper: React.FC<{
  hasAnImage?: boolean;
}> = ({ hasAnImage = false }) => {
  const headerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const themeCheckerFn = () => {
      const element = headerRef.current;

      if (!element) return;

      if (hasAnImage) {
        element.toggleAttribute('data-image', window.scrollY <= 800 - 84);
      } else {
        element.toggleAttribute('data-background', window.scrollY >= 64);
      }
    };
    themeCheckerFn();

    const events = ['scroll', 'orientationchange', 'resize'];
    events.forEach((event) => window.addEventListener(event, themeCheckerFn));

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, themeCheckerFn)
      );
    };
  }, [hasAnImage]);

  return (
    <>
      <div
        className="bg- fixed left-0 top-0 z-10 w-full bg-gray-10 text-gray-900 data-[background]:bg-gray-10 lg:data-[image]:bg-transparent lg:data-[image]:text-gray-10"
        ref={headerRef}
      >
        <Header />
      </div>
    </>
  );
};

// Pitanje: pošto su ove komponente isto client renderane (samo je header na serveru), hoću li ih passati kao prop na Header.tsx componenti ili da ostavim sada kako je napravljeno (exportanje u Header.tsx componentu) ili da napravim posebne componente za svaku te ih onda importam

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

export const SidebarDrawer = () => (
  <RadixDialog.Root>
    <RadixDialog.Trigger className="group cursor-pointer">
      <Icon
        name="hamburger"
        className="cursor-pointer outline-none group-data-[state=open]:hidden"
      />
    </RadixDialog.Trigger>

    <RadixDialog.Content className="text-grayscale-10 fixed left-0 top-0 z-max flex h-full w-5/6 flex-col overflow-scroll overflow-x-hidden bg-gray-900">
      <RadixDialog.Title className="hidden" />
      <div className="flex h-full flex-col text-gray-10">
        <div className="border-b border-gray-10">
          <div className="flex h-22 items-center pl-8 pr-6 text-md text-gray-10">
            <Icon name="search" />
            <Input
              className="w-full text-gray-10"
              label="Search"
              inputProps={{ className: 'text-gray-10 bg-gray-900 border-0' }}
            />
            <RadixDialog.Close asChild>
              <Icon name="close" className="text-gray-10" />
            </RadixDialog.Close>
          </div>
        </div>
        <ul className="mt-8 flex flex-col gap-8 pl-8">
          <li>
            <RadixDialog.Close asChild>
              <Link href="/about" className="text-xl">
                About
              </Link>
            </RadixDialog.Close>
          </li>
          <li>
            <RadixDialog.Close asChild>
              <Link href="/inspiration" className="text-xl">
                Inspiration
              </Link>
            </RadixDialog.Close>
          </li>
          <li>
            <RadixDialog.Close asChild>
              <Link href="/shop" className="text-xl">
                Shop
              </Link>
            </RadixDialog.Close>
          </li>
        </ul>
        <div className="mt-auto py-8 pl-8">
          <LanguageSelect />
        </div>
      </div>
    </RadixDialog.Content>
  </RadixDialog.Root>
);
