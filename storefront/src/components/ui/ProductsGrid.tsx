'use client';

// External packages
import Image from 'next/image';
import * as React from 'react';
import { HttpTypes } from '@medusajs/types';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { ProductCard, ProductCardSkeleton } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { type SortOptions } from '@/components/ui/filters/Sort';

// Hooks
import { useStoreProducts } from '@/hooks2/store';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';
import { getProductPrice } from '@/lib/util/get-product-price';

export const ProductsMapping: React.FC<{
  sortBy?: SortOptions;
  page: number;
  collectionId?: string | string[];
  categoryId?: string | string[];
  typeId?: string | string[];
  productsIds?: string[];
  direction?: 'horizontal' | 'vertical';
  location: string;
}> = withReactQueryProvider(
  ({
    page,
    categoryId,
    collectionId,
    typeId,
    productsIds,
    sortBy,
    location,
    direction = 'vertical',
  }) => {
    const queryParams: HttpTypes.StoreProductListParams = {
      limit: 12,
    };

    if (collectionId)
      queryParams['collection_id'] = Array.isArray(collectionId)
        ? collectionId
        : [collectionId];

    if (categoryId)
      queryParams['category_id'] = Array.isArray(categoryId)
        ? categoryId
        : [categoryId];

    if (typeId)
      queryParams['type_id'] = Array.isArray(typeId) ? typeId : [typeId];

    if (productsIds) queryParams['id'] = productsIds;

    if (sortBy === 'created_at') queryParams['order'] = sortBy;

    const productsQuery = useStoreProducts({
      page,
      countryCode: location,
      queryParams,
      sortBy,
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = React.useState(page);

    const fetchNextProducts = async () => {
      if (!productsQuery.hasNextPage) return;

      productsQuery.fetchNextPage();

      const params = new URLSearchParams(searchParams.toString());

      setCurrentPage((prev) => prev + 1);
      params.set('page', (currentPage + 1).toString());

      router.replace(`?${params.toString()}`, { scroll: false });
    };

    console.log(productsQuery.data.pages);
    return (
      <>
        <LayoutRow
          className={
            direction === 'vertical'
              ? '-mr-4 mt-8 lg:-mr-12'
              : '"-mr-4 lg:-mr-12" mt-8 flex snap-x snap-mandatory flex-nowrap overflow-x-scroll'
          }
        >
          {productsQuery.data.pages.flatMap((page) =>
            page.response.products.map((product) => {
              const { cheapestPrice } = getProductPrice({
                product,
              });

              return (
                <LayoutColumn
                  xs={6}
                  xl={4}
                  className="mb-10 flex-shrink-0 snap-start pr-4 lg:mb-16 lg:pr-12"
                  key={product.id}
                >
                  <ProductCard
                    name={product.title}
                    category={product.collection!.title}
                    image={
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={product.thumbnail!}
                          className="object-cover"
                          alt={product.description!}
                          fill
                        />
                      </div>
                    }
                    price={cheapestPrice?.calculated_price.toString()!}
                    originalPrice={
                      cheapestPrice?.original_price ===
                      cheapestPrice?.calculated_price
                        ? undefined
                        : cheapestPrice?.original_price.toString()
                    }
                    href={`/product/${product.handle}`}
                  />
                </LayoutColumn>
              );
            })
          )}

          {productsQuery.isFetchingNextPage && (
            <ProductsSkeletonMapping amount={4} />
          )}
        </LayoutRow>
        {productsQuery.hasNextPage && !productsQuery.isFetchingNextPage && (
          <Button className="mx-auto" onPress={fetchNextProducts}>
            View All
          </Button>
        )}

        {!productsQuery.data && <h4>No results matched clear filter </h4>}
      </>
    );
  }
);

export const ProductsSkeletonMapping: React.FC<{
  amount?: number;
}> = ({ amount = 6 }) => {
  return (
    <LayoutRow className="-mr-4 mt-8 lg:-mr-12">
      {[...Array(amount)].map((_, index) => (
        <LayoutColumn
          xs={6}
          xl={4}
          className="mb-10 flex-shrink-0 snap-start pr-4 lg:mb-16 lg:pr-12"
          key={index}
        >
          <ProductCardSkeleton />
        </LayoutColumn>
      ))}
    </LayoutRow>
  );
};
