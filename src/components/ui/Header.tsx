'use client';

// External packages
import * as React from 'react';
import Link from 'next/link';
import * as RadixDialog from '@radix-ui/react-dialog';

// Components
import { Icon } from '@/components/ui/Icon';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Input } from '@/components/ui/Input';
import {
  Button as AriaButton,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

export const Header: React.FC<{
  colorScheme?: 'light' | 'dark';
}> = ({ colorScheme = 'light' }) => {
  const headerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const themeCheckerFn = () => {
      const element = headerRef.current;
      if (element && colorScheme === 'light') {
        element.toggleAttribute(
          'data-dark-theme',
          window.scrollY <= window.innerHeight * 0.7
        );
      }
    };
    themeCheckerFn();
    window.addEventListener('scroll', () => {
      themeCheckerFn();
    });

    return () => {
      window.removeEventListener('scroll', themeCheckerFn);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-10 w-full bg-gray-10 text-gray-900 lg:data-[dark-theme]:bg-transparent lg:data-[dark-theme]:text-gray-10"
      ref={headerRef}
    >
      <Layout>
        <LayoutRow className="h-22 items-center">
          <Link href="/">
            <h1 className="text-lg font-medium">SofaSocietyCo.</h1>
          </Link>
          <LayoutColumn lgOffset={2} xlOffset={3}>
            <ul className="hidden gap-8 lg:flex">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/inspiration">Inspiration</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
            </ul>
          </LayoutColumn>
          <div className="ml-auto hidden items-center gap-8 lg:flex">
            <LanguageSelect />
            <Icon name="search" className="cursor-pointer" />
            <Link href="/">
              <Icon name="bag" />
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-8 lg:hidden">
            <Link href="/">
              <Icon name="bag" />
            </Link>

            <Drawer />
          </div>
        </LayoutRow>
      </Layout>
    </div>
  );
};

const Drawer = () => (
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

const LanguageSelect = () => (
  <Select defaultSelectedKey="croatian">
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
      className="h-52 w-60 overflow-scroll rounded border border-gray-900 bg-gray-10"
    >
      <ListBox>
        <ListBoxItem id="afghanistan" className="cursor-pointer p-4 outline-0">
          afghanistan
        </ListBoxItem>
        <ListBoxItem id="albania" className="cursor-pointer p-4 outline-0">
          albania
        </ListBoxItem>
        <ListBoxItem id="algeria" className="cursor-pointer p-4 outline-0">
          algeria
        </ListBoxItem>
        <ListBoxItem id="andorra" className="cursor-pointer p-4 outline-0">
          andorra
        </ListBoxItem>
        <ListBoxItem id="croatian" className="cursor-pointer p-4 outline-0">
          croatian
        </ListBoxItem>
        <ListBoxItem id="english" className="cursor-pointer p-4 outline-0">
          english
        </ListBoxItem>
      </ListBox>
    </Popover>
  </Select>
);
