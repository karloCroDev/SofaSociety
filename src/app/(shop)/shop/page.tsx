// External packages
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Layout, LayoutColumn } from '@/components/ui/Layout';
import { LayoutRow } from '@/components/ui/Layout';
import { Collections } from '@/components/ui/Collections';
import { ProductCard } from '@/components/ui/ProductCard';
import { Slider } from '@/components/shop/shop/Slider';
import { Color } from '@/components/shop/shop/Color';
import { Materials } from '@/components/shop/shop/Materials';
import { Collection } from '@/components/shop/shop/Collection';
import { PopoverFilter } from '@/components/shop/shop/PopoverFilter';

// Images
import ImageScandinavianSimplicity from '@/public/images/home/scandinavian-simplicity.png';
import ImageModernLuxe from '@/public/images/home/modern-luxe.png';
import ImageBohoChic from '@/public/images/home/boho-chic.png';
import ImageTimlessCLassics from '@/public/images/home/timless-classiscs.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';
import { Drawer } from '@/components/shop/shop/Drawer';
import { Sort } from '@/components/shop/shop/Sort';

export default function Shop() {
  return (
    <Layout className="mt-44">
      <h2 className="hidden text-2xl font-medium lg:block">Collections</h2>
      <LayoutRow className="-mr-6 mt-8 hidden lg:flex">
        <LayoutColumn lg={3} className="pr-6">
          <Link href="/scandinavian-furniture">
            <Image
              src={ImageScandinavianSimplicity}
              alt="Scandinavian furnuture"
            />
            <p className="mt-6">Scandinavian simplicity</p>
          </Link>
        </LayoutColumn>
        <LayoutColumn lg={3} className="pr-6">
          <Link href="/modern-luxe-furniture">
            <Image src={ImageModernLuxe} alt="Modern luxe" />
            <p className="mt-6">Modern Luxe</p>
          </Link>
        </LayoutColumn>
        <LayoutColumn lg={3} className="pr-6">
          <Link href="/boho-chic">
            <Image src={ImageBohoChic} alt="Boho Chic" />
            <p className="mt-6">Boho Chic</p>
          </Link>
        </LayoutColumn>
        <LayoutColumn lg={3} className="pr-6">
          <Link href="/timeless-classics">
            <Image src={ImageTimlessCLassics} alt="Timeless Classics" />
            <p className="mt-6">Timeless Classics</p>
          </Link>
        </LayoutColumn>
      </LayoutRow>
      <div className="lg:hidden">
        <Collections />
      </div>

      <h2 className="mt-24 text-2xl font-medium lg:mt-36">Shop</h2>
      <div className="mt-8 flex justify-between">
        <div className="hidden gap-4 lg:flex">
          <PopoverFilter title="Price">
            <Slider />
          </PopoverFilter>
          <PopoverFilter title="Color">
            <Color />
          </PopoverFilter>
          <PopoverFilter title="Materials">
            <Materials />
          </PopoverFilter>
          <PopoverFilter title="Collection">
            <Collection />
          </PopoverFilter>
        </div>
        <Drawer />
        <PopoverFilter
          title="Collection"
          popoverProps={{
            placement: 'bottom right',
          }}
        >
          <Sort />
        </PopoverFilter>
      </div>
      <LayoutRow className="-mr-4 mt-8 lg:-mr-12">
        {[...Array(9)].map((_, index) => (
          <LayoutColumn
            xs={6}
            xl={4}
            className="mb-10 pr-4 lg:mb-16 lg:pr-12"
            key={index}
          >
            <ProductCard
              name="Astrid Curve"
              category="Scandinavian Simplicity"
              image={
                <div className="">
                  <Image src={ImageAstridCurve} alt="Astrid curve image" />
                </div>
              }
              price="1800€"
            />
          </LayoutColumn>
        ))}
      </LayoutRow>
    </Layout>
  );
}
