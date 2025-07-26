import { getProductsListWithSort } from '@/lib/data/products';
import { HttpTypes } from '@medusajs/types';
import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { type SortOptions } from '@/components/ui/filters/Sort';
import { getSearchItems } from '@/lib2/data/search';

export const useStoreProducts = ({
  page,
  queryParams,
  sortBy,
  countryCode,
}: {
  page: number;
  queryParams: HttpTypes.StoreProductListParams;
  sortBy: SortOptions | undefined;
  countryCode: string;
}) => {
  return useSuspenseInfiniteQuery({
    initialPageParam: page,
    queryKey: ['products', queryParams, sortBy, countryCode],
    queryFn: async ({ pageParam }) => {
      return getProductsListWithSort({
        page: pageParam,
        queryParams,
        sortBy,
        countryCode,
      });
    },
    getNextPageParam: (lastPage: {
      response: { products: HttpTypes.StoreProduct[]; count: number };
      nextPage: number | null;
      queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
    }) => {
      if (!lastPage.nextPage) {
        return undefined;
      }
      return (
        Math.ceil(lastPage.nextPage / (lastPage.queryParams?.limit || 12)) + 1
      );
    },
  });
};

// Karlo
export const useSearchProducts = ({
  value,
  region,
}: {
  value: string;
  region?: string;
}) => {
  return useQuery({
    queryKey: ['searchProducts', value, region],
    queryFn: () =>
      getSearchItems({
        value,
        region,
      }),
    enabled: !!value, // Prevent fetching on load, only fetching when user writes something, or region changes
  });
};
