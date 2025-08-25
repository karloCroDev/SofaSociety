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
import { type SortOptions } from '@/components/ui/filters/Sort';
import { Filters } from '@/components/ui/filters/Filters';

// Lib
import { getCollectionsList } from '@/lib/data/collections';
import { getSpecificCategories } from '@/lib/data/categories';
import { converterCheckerArray } from '@/lib/util/arrayChecker';
import { getSpecificProductType } from '@/lib/data/product-types';
import { collectionMetadataCustomFieldsSchema } from '@/lib/util/collections';

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
    getCollectionsList({ fields: ['id', 'metadata', 'handle'] }),
    getSpecificCategories({
      fields: ['id', 'name', 'handle'],
    }),
    getSpecificProductType({
      fields: ['id', 'value'],
    }),
  ]);

  return (
    <Layout className="mt-32 lg:mt-44">
      <h2 className="hidden text-xl font-medium lg:block lg:text-3xl">
        Collections
      </h2>
      <LayoutRow className="-mr-6 mt-8 hidden lg:flex">
        {collections.collections.map((collection) => {
          const collectionConverter =
            collectionMetadataCustomFieldsSchema.safeParse(
              collection.metadata ?? {}
            );

          return (
            <LayoutColumn lg={3} className="pr-6" key={collection.id}>
              <Link href={`/collection/${collection.handle}`}>
                <div className="relative aspect-[3/4]">
                  {collectionConverter.success &&
                    collectionConverter.data.image?.url && (
                      <Image
                        // Karlo: Dodaj u zod schemu
                        src={collectionConverter.data.image.url}
                        fill
                        alt="Scandinavian furniture"
                      />
                    )}
                </div>
                <p className="mt-6">{collection.title}</p>
              </Link>
            </LayoutColumn>
          );
        })}
      </LayoutRow>
      <div className="lg:hidden">
        <Collections collections={collections.collections} />
      </div>

      <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">Shop</h2>
      <Filters
        collectionFilters={converterCheckerArray(collection)}
        appliedCollectionFilters={collections.collections.map((collection) => ({
          handle: collection.handle,
          name: collection.title,
          id: collection.id,
        }))}
        categoryFilters={converterCheckerArray(category)}
        appliedCategoryFilters={categories.map((collection) => ({
          handle: collection.handle,
          name: collection.name,
          id: collection.id,
        }))}
        typesFilters={converterCheckerArray(type)}
        appliedTypeFilters={types.product_types.map((collection) => ({
          handle: collection.value,
          name: collection.value,
          id: collection.id,
        }))}
        sort={sortBy}
      />

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
              : categories
                  .filter((c) => category.includes(c.handle))
                  .map((c) => c.id)
          }
          typeId={
            !type
              ? undefined
              : types.product_types
                  .filter((c) => type.includes(c.value))
                  .map((c) => c.id)
          }
          location={location}
        />
      </Suspense>
    </Layout>
  );
}
