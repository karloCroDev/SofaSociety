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

// Lib
import { getCollectionsList } from '@/lib/data/collections';
import { getCategoriesList } from '@/lib/data/categories';
import { getProductTypesList } from '@/lib/data/product-types';
import { getRegion } from '@/lib/data/regions';

interface PageProps {
  params: Promise<{ location: string }>;
}

export default async function Shop({ params }: PageProps) {
  const { location } = await params;

  const { collections } = await getCollectionsList(0, 20, [
    'metadata',
    'handle',
    'title',
  ]);

  const [categories, types, region] = await Promise.all([
    getCategoriesList(0, 100, ['id', 'name', 'handle']),
    getProductTypesList(0, 100, ['id', 'value']),
    getRegion(location),
  ]);

  return (
    <Layout className="mt-32 lg:mt-44">
      <h2 className="hidden text-xl font-medium lg:block lg:text-3xl">
        Collections
      </h2>
      <LayoutRow className="-mr-6 mt-8 hidden lg:flex">
        {collections.map((collection) => (
          <LayoutColumn lg={3} className="pr-6" key={collection.id}>
            <Link href={`/collection/${collection.handle}`}>
              <div className="relative aspect-[3/4]">
                <Image
                  // @ts-ignore
                  src={collection.metadata?.image?.url}
                  fill
                  alt="Scandinavian furnuture"
                />
              </div>
              <p className="mt-6">{collection.title}</p>
            </Link>
          </LayoutColumn>
        ))}
      </LayoutRow>
      <div className="lg:hidden">
        <Collections collections={collections} />
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
          {region && (
            <ProductsMapping
              // Karlo: Account for params from the url
              sortBy="created_at"
              page={1}
              collectionId={undefined}
              categoryId={categories.product_categories.map((c) => c.id)}
              typeId={types.productTypes.map((t) => t.id)}
              location={location}
            />
          )}
        </Suspense>
      </LayoutRow>
      <Button className="mx-auto">View All</Button>
    </Layout>
  );
}
//  sortBy={sortBy}
//             page={pageNumber}
//             collectionId={collection.id}
//             countryCode={countryCode}
//             categoryId={
//               !category
//                 ? undefined
//                 : categories.product_categories
//                     .filter((c) => category.includes(c.handle))
//                     .map((c) => c.id)
//             }
//             typeId={
//               !type
//                 ? undefined
//                 : types.productTypes
//                     .filter((t) => type.includes(t.value))
//                     .map((t) => t.id)
//             }
