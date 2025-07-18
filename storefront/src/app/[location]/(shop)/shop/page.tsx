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
import { ProductFilters } from '@/components/ui/filters/ProductFilters';
import { PopoverOption } from '@/components/ui/filters/PopoverOption';
import { Sort, type SortOptions } from '@/components/ui/filters/Sort';
import { DrawerFilter } from '@/components/ui/filters/DrawerFilter';
import { DrawerSort } from '@/components/ui/filters/DrawerSort';

// Lib
import { getCollectionsList } from '@/lib/data/collections';
import { getCategoriesList } from '@/lib/data/categories';
import { getProductTypesList } from '@/lib/data/product-types';

interface PageProps {
  params: Promise<{ location: string }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: SortOptions;
    collection?: string | string[];
    category?: string | string[];
    type?: string | string[];
  }>;
}

export default async function Shop({ params, searchParams }: PageProps) {
  const { location } = await params;

  const { page, category, collection, sortBy, type } = await searchParams;
  const [collections, categories, types] = await Promise.all([
    getCollectionsList(0, 20, ['metadata', 'handle', 'title']),
    getCategoriesList(0, 100, ['id', 'name', 'handle']),
    getProductTypesList(0, 100, ['id', 'value']),
  ]);

  const collectionAppliedFilters = collections.collections.map(
    (collection) => ({
      handle: collection.handle,
      name: collection.title,
      id: collection.id,
    })
  );
  const categoryAppliedFilters = categories.product_categories.map(
    (collection) => ({
      handle: collection.handle,
      name: collection.name,
      id: collection.id,
    })
  );
  const typeAppliedFilters = types.productTypes.map((collection) => ({
    handle: collection.value,
    name: collection.value,
    id: collection.id,
  }));

  const converterCheckerArray = (value: string | string[] | undefined) => {
    return !value ? undefined : Array.isArray(value) ? value : [value];
  };
  return (
    <Layout className="mt-32 lg:mt-44">
      <h2 className="hidden text-xl font-medium lg:block lg:text-3xl">
        Collections
      </h2>
      <LayoutRow className="-mr-6 mt-8 hidden lg:flex">
        {collections.collections.map((collection) => (
          <LayoutColumn lg={3} className="pr-6" key={collection.id}>
            <Link href={`/collection/${collection.handle}`}>
              <div className="relative aspect-[3/4]">
                <Image
                  // @ts-ignore
                  src={collection.metadata?.image?.url}
                  fill
                  alt="Scandinavian furniture"
                />
              </div>
              <p className="mt-6">{collection.title}</p>
            </Link>
          </LayoutColumn>
        ))}
      </LayoutRow>
      <div className="lg:hidden">
        <Collections collections={collections.collections} />
      </div>

      <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">Shop</h2>
      <div className="mt-6 flex justify-between lg:mt-8">
        <div className="hidden gap-4 lg:flex">
          <PopoverOption title="Collection">
            <ProductFilters
              type="collection"
              productFilters={converterCheckerArray(collection)}
              appliedProductFilters={collectionAppliedFilters}
            />
          </PopoverOption>
          <PopoverOption title="Category">
            <ProductFilters
              type="category"
              productFilters={converterCheckerArray(category)}
              appliedProductFilters={categoryAppliedFilters}
            />
          </PopoverOption>
          <PopoverOption title="Types">
            <ProductFilters
              type="type"
              productFilters={converterCheckerArray(type)}
              appliedProductFilters={typeAppliedFilters}
            />
          </PopoverOption>
        </div>
        <div className="hidden lg:block">
          <PopoverOption
            title="Sort by"
            popoverProps={{
              placement: 'bottom right',
            }}
          >
            <Sort sort={sortBy} />
          </PopoverOption>
        </div>

        <DrawerFilter
          collectionType={converterCheckerArray(collection)}
          collectionAppliedFilter={collectionAppliedFilters}
          categoryAppliedFilter={categoryAppliedFilters}
          categoryType={converterCheckerArray(collection)}
          typeAppliedFilter={typeAppliedFilters}
          typeType={converterCheckerArray(type)}
        />
        <DrawerSort sortBy={sortBy} />
      </div>

      <Suspense fallback={<ProductsSkeletonMapping />}>
        <ProductsMapping
          // Karlo: Account for params from the url
          sortBy={sortBy}
          page={page ? +page : 1}
          collectionId={
            !collection
              ? undefined
              : collections.collections
                  .filter((c) => collection.includes(c.handle))
                  .map((c) => c.id)
          }
          categoryId={
            !category
              ? undefined
              : categories.product_categories
                  .filter((c) => category.includes(c.handle))
                  .map((c) => c.id)
          }
          typeId={
            !type
              ? undefined
              : types.productTypes
                  .filter((c) => type.includes(c.value))
                  .map((c) => c.id)
          }
          location={location}
        />
      </Suspense>
    </Layout>
  );
}
