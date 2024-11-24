'use client';

// External packages
import * as React from 'react';
import Link from 'next/link';

// Components
import { Icon } from '@/components/ui/Icon';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
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
            <Icon name="hamburger" />
          </div>
        </LayoutRow>
      </Layout>
    </div>
  );
};

const LanguageSelect = () => {
  const listBoxItemStyle = 'p-4 outline-0 cursor-pointer';
  return (
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
          <ListBoxItem id="afghanistan" className={listBoxItemStyle}>
            afghanistan
          </ListBoxItem>
          <ListBoxItem id="albania" className={listBoxItemStyle}>
            albania
          </ListBoxItem>
          <ListBoxItem id="algeria" className={listBoxItemStyle}>
            algeria
          </ListBoxItem>
          <ListBoxItem id="andorra" className={listBoxItemStyle}>
            andorra
          </ListBoxItem>
          <ListBoxItem id="croatian" className={listBoxItemStyle}>
            croatian
          </ListBoxItem>
          <ListBoxItem id="english" className={listBoxItemStyle}>
            english
          </ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  );
};
