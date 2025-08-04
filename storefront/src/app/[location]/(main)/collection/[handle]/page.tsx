// External packages
import Image from 'next/image';
import { Suspense } from 'react';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import {
  ProductsMapping,
  ProductsSkeletonMapping,
} from '@/components/ui/ProductsGrid';
import { type SortOptions } from '@/components/ui/filters/Sort';
import { Filters } from '@/components/ui/filters/Filters';

// Lib
import { getCollectionByHandle } from '@/lib2/data/collections';
import { collectionMetadataCustomFieldsSchema } from '@/lib2/util/collections';
import { getRegion } from '@/lib2/data/regions';
import { converterCheckerArray } from '@/lib2/util/arrayChecker';
import { getSpecificCategories } from '@/lib2/data/categories';
import { getSpecificProductType } from '@/lib2/data/product-types';

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

  const isArrayCategory = converterCheckerArray(category);
  const isArrayType = converterCheckerArray(type);

  const collection = await getCollectionByHandle({
    handle,
    fields: ['metadata', 'title', 'products'],
  });
  const collectionConverter = collectionMetadataCustomFieldsSchema.safeParse(
    collection.metadata ?? {}
  );

  const collectionData = {
    ...collectionConverter.data,
    title: collection.title,
  };

  const [categories, types, region] = await Promise.all([
    getSpecificCategories({
      offset: 0,
      limit: 100,
      fields: ['id', 'name', 'handle'],
    }),
    getSpecificProductType({
      offset: 0,
      limit: 100,
      fields: ['id', 'value'],
    }),
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

        <Filters
          appliedCategoryFilters={categories.map((collection) => ({
            handle: collection.handle,
            name: collection.name,
            id: collection.id,
          }))}
          categoryFilters={converterCheckerArray(category)}
          appliedTypeFilters={types.product_types.map((collection) => ({
            handle: collection.value,
            name: collection.value,
            id: collection.id,
          }))}
          typesFilters={converterCheckerArray(type)}
          sort={sortBy}
          isCollectionHidden
        />

        <Suspense fallback={<ProductsSkeletonMapping />}>
          {region && (
            <ProductsMapping
              page={page ? +page : 1}
              collectionId={collection.id}
              categoryId={
                !isArrayCategory
                  ? undefined
                  : categories
                      .filter((c) => isArrayCategory.includes(c.handle))
                      .map((c) => c.id)
              }
              typeId={
                !isArrayType
                  ? undefined
                  : types.product_types
                      .filter((t) => isArrayType.includes(t.value))
                      .map((t) => t.id)
              }
              location={location}
              sortBy={sortBy}
            />
          )}
        </Suspense>
      </Layout>
    </>
  );
}
