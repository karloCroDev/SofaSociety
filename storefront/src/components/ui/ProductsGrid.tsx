'use client';

// External packages
import Image from 'next/image';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { ProductCard, ProductCardSkeleton } from '@/components/ui/ProductCard';
import { HttpTypes, StoreProduct } from '@medusajs/types';

// Assets
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';
import { useStoreProducts } from '@/hooks/store';
import { withReactQueryProvider } from '@/lib/util/react-query';

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

    const productsQuery = useStoreProducts({
      page,
      countryCode: location, // Karlo: Pitaj Antu je li ovo trebam implementirati
      queryParams,
      sortBy,
    });

    console.log('Test', productsQuery.data);
    console.log(productsQuery?.data?.pages[0]?.response?.products?.length);

    return [...Array(8)].map((_, index) => (
      <LayoutColumn
        xs={6}
        xl={4}
        className="mb-10 flex-shrink-0 snap-start pr-4 lg:mb-16 lg:pr-12"
        key={index}
      >
        <ProductCard
          name="Astrid Curve"
          category="Scandinavian Simplicity"
          image={
            <div>
              <Image src={ImageAstridCurve} alt="Astrid curve image" />
            </div>
          }
          price="1800€"
          href="/product"
        />
      </LayoutColumn>
    ));
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
