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
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { CodeCountryTypes } from '@/components/ui/header/Header';

// Hooks
import { useCountryCode } from '@/hooks/country-code';
import { useUpdateRegion } from '@/hooks/cart';
import { withReactQueryProvider } from '@/lib/util/react-query';
import { usePathname } from 'next/navigation';

export const HeaderWrapper: React.FC<{
  hasAnImage: boolean;
  children: React.ReactNode;
}> = ({ hasAnImage, children }) => {
  const headerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const themeCheckerFn = () => {
      const element = headerRef.current;

      if (!element) return;

      if (hasAnImage) {
        element.toggleAttribute('data-image', window.scrollY <= 800 - 88);
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
    <div
      className="fixed left-0 top-0 z-10 w-full bg-gray-10 text-gray-900 data-[background]:bg-gray-10 lg:data-[image]:bg-transparent lg:data-[image]:text-gray-10"
      ref={headerRef}
    >
      {children}
    </div>
  );
};

export const LanguageSelect: React.FC<{
  codeCountry: CodeCountryTypes;
}> = withReactQueryProvider(({ codeCountry }) => {
  const countryCode = useCountryCode(
    codeCountry.map((code) => ({
      country: code.country,
      region: code.id,
      label: code.countryName,
    }))
  );
  console.log(codeCountry);
  const pathname = usePathname();
  let currentPath = pathname;

  if (countryCode) {
    currentPath = pathname.split(`/${countryCode}`)[1];
  }

  const updateRegion = useUpdateRegion();

  return (
    <Select
      selectedKey={countryCode}
      aria-label="Country Selector"
      onSelectionChange={(key) => {
        console.log(key);
        updateRegion.mutate({ countryCode: key.toString(), currentPath });
      }}
    >
      <AriaButton className="outline-none">
        <div className="flex items-center gap-2">
          {/* Customize display: show the country code of the selected item */}

          <SelectValue className="uppercase">
            {(item) =>
              typeof item.selectedItem === 'object' &&
              !!item.selectedItem &&
              'country' in item.selectedItem &&
              typeof item.selectedItem.country === 'string'
                ? item.selectedItem.country
                : item.defaultChildren
            }
          </SelectValue>
          <Icon name="chevron" />
        </div>
      </AriaButton>

      <Popover
        placement="bottom"
        className="relative z-[10000000] h-52 w-60 overflow-scroll rounded border border-gray-900 bg-gray-10"
      >
        <ListBox>
          {codeCountry.map((code) => (
            <ListBoxItem
              key={code.numCode}
              id={code.country}
              value={code}
              className="z-10 cursor-pointer p-4 outline-0"
            >
              {code.countryName}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
});

export const SidebarDrawer: React.FC<{
  codeCountry: CodeCountryTypes;
}> = ({ codeCountry }) => (
  <RadixDialog.Root>
    <RadixDialog.Trigger className="group cursor-pointer">
      <Icon
        name="hamburger"
        className="cursor-pointer outline-none group-data-[state=open]:hidden"
      />
    </RadixDialog.Trigger>

    <RadixDialog.Content className="fixed left-0 top-0 z-max flex h-full w-5/6 flex-col overflow-scroll overflow-x-hidden bg-gray-900">
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
          <LanguageSelect codeCountry={codeCountry} />
        </div>
      </div>
    </RadixDialog.Content>
  </RadixDialog.Root>
);
