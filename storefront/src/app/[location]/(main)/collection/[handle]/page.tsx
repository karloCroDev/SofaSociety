// External packages
import Image from 'next/image';
import { Suspense } from 'react';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';

import { PopoverOption } from '@/components/ui/filters/PopoverOption';
import { Sort } from '@/components/ui/filters/Sort';
import { DrawerFilter } from '@/components/ui/filters/DarwerFilter';
import { DrawerSort } from '@/components/ui/filters/DrawerSort';
import {
  ProductsMapping,
  ProductsSkeletonMapping,
} from '@/components/ui/ProductsGrid';
import { type SortOptions } from '@/components/ui/filters/Sort';

// Lib
import { getCollectionByHandle } from '@/lib/data/collections';
import { collectionMetadataCustomFieldsSchema } from '@/lib/util/collections';
import { getCategoriesList } from '@/lib/data/categories';
import { getProductTypesList } from '@/lib/data/product-types';
import { getRegion } from '@/lib/data/regions';
import { ProductFilters } from '@/components/ui/filters/ProductFilters';

interface PageProps {
  params: Promise<{ location: string; handle: string }>;
  searchParams: Promise<{
    category?: string | string[];
    sortBy?: SortOptions;
    type?: string | string[];
    page?: string;
  }>;
}

export default async function CollectionPage({
  params,
  searchParams,
}: PageProps) {
  const { handle, location } = await params;
  const { category, type, page, sortBy } = await searchParams;

  console.log(page);

  const isArrayCategory = !category
    ? undefined
    : Array.isArray(category)
      ? category
      : [category];

  const isArrayType = !type ? undefined : Array.isArray(type) ? type : [type];

  const collection = await getCollectionByHandle(handle, [
    'metadata',
    'title',
    'products',
  ]);
  const collectionConverter = collectionMetadataCustomFieldsSchema.safeParse(
    collection.metadata ?? {}
  );

  const collectionData = {
    ...collectionConverter.data,
    title: collection.title,
  };

  const [categories, types, region] = await Promise.all([
    getCategoriesList(0, 100, ['id', 'name', 'handle']),
    getProductTypesList(0, 100, ['id', 'value']),
    getRegion(location),
  ]);

  return (
    <>
      <div className="relative mt-22 h-80 lg:mt-0 lg:h-[800px]">
        {collectionData?.image?.url && (
          <Image
            src={collectionData.image.url}
            alt="Main image that represents collection"
            className="object-cover"
            fill
          />
        )}
      </div>

      <Layout>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={5}>
            <h2 className="text-xl font-medium lg:text-3xl">
              {collectionData?.collection_page_heading}
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-6 lg:mt-16">
            <p>{collectionData?.collection_page_content}</p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">
          {collection.title}
        </h2>

        <div className="mt-6 flex justify-between lg:mt-8">
          <div className="hidden gap-4 lg:flex">
            <PopoverOption title="Category">
              <ProductFilters
                type="category"
                productFilters={
                  !category
                    ? undefined
                    : Array.isArray(category)
                      ? category
                      : [category]
                }
                appliedProductFilters={categories.product_categories.map(
                  (collection) => ({
                    handle: collection.handle,
                    name: collection.name,
                    id: collection.id,
                  })
                )}
              />
            </PopoverOption>
            <PopoverOption title="Types">
              <ProductFilters
                type="type"
                productFilters={
                  !type ? undefined : Array.isArray(type) ? type : [type]
                }
                appliedProductFilters={types.productTypes.map((collection) => ({
                  handle: collection.value,
                  name: collection.value,
                  id: collection.id,
                }))}
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

          <DrawerFilter />
          <DrawerSort />
        </div>

        <Suspense fallback={<ProductsSkeletonMapping />}>
          {region && (
            <ProductsMapping
              page={page ? +page : 1}
              collectionId={collection.id}
              categoryId={
                !isArrayCategory
                  ? undefined
                  : categories.product_categories
                      .filter((c) => isArrayCategory.includes(c.handle))
                      .map((c) => c.id)
              }
              typeId={
                !isArrayType
                  ? undefined
                  : types.productTypes
                      .filter((t) => isArrayType.includes(t.value))
                      .map((t) => t.id)
              }
              location={location}
            />
          )}
        </Suspense>
      </Layout>
    </>
  );
}
