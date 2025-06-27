// External packages
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

// Components
import { Layout, LayoutColumn } from '@/components/ui/Layout';
import { LayoutRow } from '@/components/ui/Layout';
import { Collections } from '@/components/ui/Collections';
import {
  ProductsMapping,
  ProductsSkeletonMapping,
} from '@/components/ui/ProductsGrid';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/filters/Slider';
import { Color } from '@/components/ui/filters/Color';
import { Materials } from '@/components/ui/filters/Materials';
import { Collection } from '@/components/ui/filters/Collection';
import { PopoverOption } from '@/components/ui/filters/PopoverOption';
import { Sort } from '@/components/ui/filters/Sort';
import { DrawerFilter } from '@/components/ui/filters/DarwerFilter';
import { DrawerSort } from '@/components/ui/filters/DrawerSort';

// Assets
import ImageScandinavianSimplicity from '@/public/images/home/scandinavian-simplicity.png';
import ImageModernLuxe from '@/public/images/home/modern-luxe.png';
import ImageBohoChic from '@/public/images/home/boho-chic.png';
import ImageTimlessCLassics from '@/public/images/home/timless-classiscs.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

// Lib
import { getCollectionsList } from '@/lib/data/collections';

const collectionImages = {
  'modern-luxe': ImageModernLuxe,
  'boho-chic': ImageBohoChic,
  'timeless-classics': ImageTimlessCLassics,
  'scandinavian-simplicity': ImageScandinavianSimplicity,
};

export default async function Shop() {
  const { collections } = await getCollectionsList();

  return (
    <Layout className="mt-32 lg:mt-44">
      <h2 className="hidden text-xl font-medium lg:block lg:text-3xl">
        Collections
      </h2>
      <LayoutRow className="-mr-6 mt-8 hidden lg:flex">
        {collections.map((collection) => (
          <LayoutColumn lg={3} className="pr-6" key={collection.id}>
            <Link href={`/collection/${collection.handle}`}>
              <Image
                // @ts-ignore
                src={collectionImages[collection.handle]}
                alt="Scandinavian furnuture"
              />
              <p className="mt-6">{collection.title}</p>
            </Link>
          </LayoutColumn>
        ))}
      </LayoutRow>
      <div className="lg:hidden">
        <Collections />
      </div>

      <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">Shop</h2>
      {/* TODO: Ja bi ove filtere ubacija ode direktno na page. FIXED */}
      <div className="mt-6 flex justify-between lg:mt-8">
        <div className="hidden gap-4 lg:flex">
          <PopoverOption title="Price">
            <Slider />
          </PopoverOption>
          <PopoverOption title="Color">
            <Color />
          </PopoverOption>
          <PopoverOption title="Materials">
            <Materials />
          </PopoverOption>
          <PopoverOption title="Collection">
            <Collection />
          </PopoverOption>
        </div>
        <div className="hidden lg:block">
          <PopoverOption
            title="Sort by"
            popoverProps={{
              placement: 'bottom right',
            }}
          >
            <Sort />
          </PopoverOption>
        </div>

        <DrawerFilter />
        <DrawerSort />
      </div>
      <LayoutRow className="-mr-4 mt-8 lg:-mr-12">
        <Suspense fallback={<ProductsSkeletonMapping />}>
          <ProductsMapping />
        </Suspense>
      </LayoutRow>
      <Button className="mx-auto">View All</Button>
    </Layout>
  );
}
