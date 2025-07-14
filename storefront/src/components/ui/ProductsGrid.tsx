'use client';

// External packages
import Image from 'next/image';
import * as React from 'react';
// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { ProductCard, ProductCardSkeleton } from '@/components/ui/ProductCard';
import { HttpTypes } from '@medusajs/types';

// Hooks
import { useStoreProducts } from '@/hooks/store';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';

// Assets
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';
import { getProductPrice } from '@/lib/util/get-product-price';

export type SortOptions = 'price_asc' | 'price_desc' | 'created_at';

export const ProductsMapping: React.FC<{
  sortBy?: SortOptions;
  page: number;
  collectionId?: string | string[];
  categoryId?: string | string[];
  typeId?: string | string[];
  productsIds?: string[];
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
  }) => {
    const queryParams: HttpTypes.StoreProductListParams = {
      limit: 12,
    };

    if (collectionId) {
      queryParams['collection_id'] = Array.isArray(collectionId)
        ? collectionId
        : [collectionId];
    }

    if (categoryId) {
      queryParams['category_id'] = Array.isArray(categoryId)
        ? categoryId
        : [categoryId];
    }

    if (typeId) {
      queryParams['type_id'] = Array.isArray(typeId) ? typeId : [typeId];
    }

    if (productsIds) {
      queryParams['id'] = productsIds;
    }

    if (sortBy === 'created_at') {
      queryParams['order'] = 'created_at';
    }

    console.log(sortBy);
    console.log(page);
    console.log(location);
    console.log('s', queryParams);
    console.log(productsIds);

    const productsQuery = useStoreProducts({
      page,
      countryCode: location,
      queryParams,
      sortBy,
    });

    const products = productsQuery.data?.pages[0]?.response?.products;

    return (
      products &&
      products.map((product) => {
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
              category={product.collection?.title || ''}
              image={
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.thumbnail!}
                    className="object-cover"
                    alt={product.description || ''}
                    fill
                  />
                </div>
              }
              price={cheapestPrice?.calculated_price.toString()!}
              originalPrice={
                cheapestPrice?.original_price_number?.toString() || undefined
              }
              href={`/product/${product.handle}`}
            />
          </LayoutColumn>
        );
      })
    );
  }
);

export const ProductsSkeletonMapping = () => {
  return [...Array(8)].map((_, index) => (
    <LayoutColumn
      xs={6}
      xl={4}
      className="mb-10 flex-shrink-0 snap-start pr-4 lg:mb-16 lg:pr-12"
      key={index}
    >
      <ProductCardSkeleton />
    </LayoutColumn>
  ));
};
