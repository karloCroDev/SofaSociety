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
import Link from 'next/link';
import Image from 'next/image';

// Components
import { Icon } from '@/components/ui/Icon';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';

// Images
import HeroImage from '@/public/images/home/HeroImage.png';

export default function Home() {
  return (
    <>
      <div className="fixed left-0 top-0 w-full bg-gray-10 text-gray-900 lg:bg-transparent lg:text-gray-10">
        <Layout>
          <LayoutRow className="h-22 items-center">
            <h1 className="text-lg font-medium">SofaSocietyCo.</h1>
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
      <div className="mt-22 h-full w-full lg:mt-0">
        <Image
          src={HeroImage}
          alt="Main image that represents SofaSociety.Co"
        />
      </div>

      <div className="mt-24">
        <h1 className="text-2xl font-medium">
          Elevate Your Living Space with Unmatched Comfort & Style
        </h1>
        <p>
          Discover Your Perfect Sofa Today <br />
          <Link href="/" className="underline underline-offset-4">
            Explore Now
          </Link>
        </p>
      </div>
    </>
  );
}

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
      <Popover className="h-52 w-60 overflow-scroll rounded border border-gray-900">
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
