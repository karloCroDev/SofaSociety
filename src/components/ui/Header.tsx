// External packages
import * as React from 'react';
import Link from 'next/link';
import * as RadixDialog from '@radix-ui/react-dialog';

// Components
import { Icon } from '@/components/ui/Icon';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Input } from '@/components/ui/Input';
import { LanguageSelect } from '@/components/ui/LanguageSelect';

export const Header: React.FC<{}> = () => {
  return (
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
