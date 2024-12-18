// External packages
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Layout, LayoutColumn } from '@/components/ui/Layout';
import { LayoutRow } from '@/components/ui/Layout';
import { Collections } from '@/components/ui/Collections';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterButton } from '@/components/shop/shop/FilterButton';
import { Icon } from '@/components/ui/Icon';
import { PopoverSlider } from '@/components/shop/shop/PopoverSlider';
import { PopoverColor } from '@/components/shop/shop/PopoverColor';
import { PopoverCollection } from '@/components/shop/shop/PopoverCollection';
import { PopoverMaterials } from '@/components/shop/shop/PopoverMaterials';
import { PopoverSort } from '@/components/shop/shop/PopoverSort';

// Images
import ImageScandinavianSimplicity from '@/public/images/home/scandinavian-simplicity.png';
import ImageModernLuxe from '@/public/images/home/modern-luxe.png';
import ImageBohoChic from '@/public/images/home/boho-chic.png';
import ImageTimlessCLassics from '@/public/images/home/timless-classiscs.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

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
          <PopoverSlider />
          <PopoverColor />
          <PopoverMaterials />
          <PopoverCollection />
        </div>
        <FilterButton
          iconRight={
            <Icon name="plus" className="size-4 text-gray-500 lg:size-6" />
          }
          className="lg:hidden"
        >
          Filter
        </FilterButton>
        <PopoverSort />
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
