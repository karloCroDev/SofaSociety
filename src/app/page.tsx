'use client';
// External packages
import * as React from 'react';
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
import { Button } from '@/components/ui/Button';
import { ArrowButton } from '@/components/ui/ArrowButton';

// Images
import ImageHero from '@/public/images/home/hero.png';
import ImageArmedChair from '@/public/images/home/armed-chair.png';
import ImageSofa from '@/public/images/home/sofa.png';
import ImageScandinavianSimplicity from '@/public/images/home/scandinavian-simplicity.png';
import ImageModernLuxe from '@/public/images/home/modern-luxe.png';
import ImageBohoChick from '@/public/images/home/boho-chick.png';
import ImageAboutSofa from '@/public/images/home/about-sofa.png';
import { Input } from '@/components/ui/Input';

export default function Home() {
  const headerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      const element = headerRef.current;
      if (element) {
        if (window.scrollY > window.innerHeight * 0.7)
          element.setAttribute('data-dark-theme', '');
        else element.removeAttribute('data-dark-theme');
      }
    });
  }, []);

  const scrollableContainerRef = React.useRef<null | HTMLDivElement>(null);

  const scrollContainerFn = (isDirectionLeft: boolean = false) => {
    const element = scrollableContainerRef.current;
    if (element) {
      if (isDirectionLeft) element.scrollLeft -= 100;
      else element.scrollLeft += 100;
    }
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 w-full bg-gray-10 text-gray-900 lg:bg-transparent lg:text-gray-10 lg:data-[dark-theme]:bg-gray-10 lg:data-[dark-theme]:text-gray-900"
        ref={headerRef}
      >
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

      <div className="mt-22 lg:mt-0">
        <Image
          src={ImageHero}
          alt="Main image that represents SofaSociety.Co"
          className="object-cover xl:h-[75vh]"
        />
      </div>
      <Layout>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row lg:items-center xl:mt-24">
          <LayoutColumn xs={12} lg={7}>
            <h2 className="text-2xl font-medium">
              Elevate Your Living Space with Unmatched Comfort & Style
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={3} className="lg:flex lg:justify-end">
            <p className="mt-6 lg:mt-0">
              Discover Your Perfect Sofa Today <br />
              <Link href="/" className="underline underline-offset-4">
                Explore Now
              </Link>
            </p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-2xl font-medium lg:mt-32">Our prodcuts</h2>
        <LayoutRow className="mt-8 lg:mt-16">
          <LayoutColumn xs={6} className="cursor-pointer pr-1 lg:pr-4">
            <Image src={ImageSofa} alt="Sofa image" />
            <p className="mt-2 text-lg lg:mt-8">Sofas</p>
          </LayoutColumn>
          <LayoutColumn xs={6} className="cursor-pointer pl-1 lg:pl-4">
            <Image src={ImageArmedChair} alt="Armed chair" />
            <p className="mt-2 text-lg lg:mt-8">Arm Chairs</p>
          </LayoutColumn>
        </LayoutRow>
        <div className="mt-24 flex items-center gap-6 lg:mt-32">
          <h2 className="text-2xl font-medium">Collections</h2>
          <Button className="ml-auto">View All</Button>
          <div className="hidden lg:block">
            <ArrowButton
              variation="outline"
              onPress={() => scrollContainerFn(true)}
            />
            <ArrowButton
              direction="right"
              variation="outline"
              className="ml-2"
              onPress={() => scrollContainerFn()} // Po defaultu se passa event handler, te se isprerplice s argumentom
            />
          </div>
        </div>
        <LayoutRow
          className="mt-8 flex-nowrap overflow-x-scroll lg:mt-16 lg:flex-row"
          ref={scrollableContainerRef}
        >
          <LayoutColumn xs={10} lg={5} className="flex-shrink-0 pr-10">
            <Image
              src={ImageScandinavianSimplicity}
              alt="Scandinavian furnuture"
            />
            <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
              Scandinavian Simplicity
            </h4>
            <p className="mt-2 text-sm text-gray-500 lg:text-base">
              Minimalistic designs, neutral colors, and high-quality textures
            </p>
          </LayoutColumn>
          <LayoutColumn xs={10} lg={5} className="flex-shrink-0 pr-10">
            <Image src={ImageModernLuxe} alt="Modern luxe furnuture" />
            <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
              Modern Luxe
            </h4>
            <p className="mt-2 text-sm text-gray-500 lg:text-base">
              Sophisticated and sleek, these sofas blend modern design with
              luxurious comfort
            </p>
          </LayoutColumn>
          <LayoutColumn xs={10} lg={5} className="flex-shrink-0 pr-10">
            <Image src={ImageBohoChick} alt="Boho chick furnuture" />
            <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
              Boho Chic
            </h4>
            <p className="mt-2 text-sm text-gray-500 lg:text-base">
              Infused with playful textures and vibrant patterns with eclectic
              vibes.
            </p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-2xl font-medium lg:mt-32">
          About sofa society
        </h2>
        <div className="mt-8 lg:mt-16">
          <Image src={ImageAboutSofa} alt="About us image of sofa" />
        </div>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={5}>
            <h2 className="text-2xl font-medium">
              At Sofa Society, we believe that a sofa is the heart of every
              home.
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-16 flex-col gap-6 lg:flex">
            <p>
              We are dedicated to delivering high-quality, thoughtfully designed
              sofas that merge comfort and style effortlessly.
            </p>
            <p>
              Our mission is to transform your living space into a sanctuary of
              relaxation and beauty, with products built to last.
            </p>
            <Link href="/about" className="underline underline-offset-4">
              Read more about Sofa Society
            </Link>
          </LayoutColumn>
        </LayoutRow>
      </Layout>

      <div className="mt-24 bg-gray-50 lg:mt-36">
        <Layout>
          <LayoutRow className="flex-col items-center py-8 lg:h-[335px] lg:flex-row lg:justify-between">
            <LayoutColumn
              xs={12}
              lg={2}
              className="order-1 mt-8 lg:-order-none lg:mt-0"
            >
              <p className="text-2xl font-medium leading-12">
                Sofa <br />
                Society <br />
                Co.
              </p>
              <p className="mt-6">© 2024, Sofa Society</p>
            </LayoutColumn>
            <LayoutColumn
              className="order-1 mt-16 flex gap-16 lg:order-none lg:mt-0"
              xs={12}
              lg={4}
            >
              <ul className="flex flex-col gap-4">
                <li>FAQ</li>
                <li>Heklp</li>
                <li>Delivery</li>
                <li>Returns</li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li>Instagram</li>
                <li>TikTok</li>
                <li>Pinterest</li>
                <li>Facebook</li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Terms of Use</li>
              </ul>
            </LayoutColumn>
            <LayoutColumn className="flex flex-col gap-4" xs={12} lg={4}>
              <div>
                <h4 className="text-xl font-medium">Join our newsletter</h4>
                <p>We will also send you our discount coupons!</p>
              </div>
              <div className="flex gap-2">
                <Input label="Your email" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-sm text-gray-500">
                By subscribing you agree to with our Privacy Policy and provide
                consent to receive updates from our company.
              </p>
            </LayoutColumn>
          </LayoutRow>
        </Layout>
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
