// External packages
import { HttpTypes } from '@medusajs/types';

// Components (types)
import { type SortOptions } from '@/components/ui/filters/Sort';

// Lib
import { sdk } from '@/lib2/config';
import { getRegion } from '@/lib2/data/regions';
import { sortProducts } from '@/lib2/util/sort-products';
import { medusaError } from '@/lib2/util/medusa-error';

// Ante: Pretpostavaljam da ovdje moram koristiti "fetch" umjesto modulea jerr  moram passati tag na fetch (osim ako ne postoji nacin da passam to na moduleu :))
export async function getProductsById({
  ids,
  regionId,
}: {
  ids: string[];
  regionId: string;
}) {
  try {
    const { products } = await sdk.client.fetch<{
      products: HttpTypes.StoreProduct[];
    }>(`/store/products`, {
      query: {
        id: ids,
        region_id: regionId,
        fields: '*variants.calculated_price,+variants.inventory_quantity',
      },
      next: { tags: ['products'] },
      cache: 'force-cache',
    });

    return products;
  } catch (error) {
    medusaError(error);
  }
}

export async function getProductByHandle({
  handle,
  regionId,
}: {
  handle: string;
  regionId: string;
}) {
  try {
    const { products } = await sdk.client.fetch<{
      products: HttpTypes.StoreProduct[];
    }>(`/store/products`, {
      query: {
        handle,
        region_id: regionId,
        fields: '*variants.calculated_price,+variants.inventory_quantity',
      },
      next: { tags: ['products'] },
    });
    return products[0];
  } catch (error) {
    medusaError(error);
  }
}

export async function getProductFashionDataByHandle(handle: string) {
  try {
    const { materials } = await sdk.client.fetch<{
      materials: {
        id: string;
        name: string;
        colors: {
          id: string;
          name: string;
          hex_code: string;
        }[];
      }[];
    }>(`/store/custom/fashion/${handle}`, {
      method: 'GET',
      next: { tags: ['products'] },
      cache: 'force-cache',
    });
    return materials;
  } catch (error) {
    medusaError(error);
  }
}

export async function getProductsList({
  pageParam = 1,
  queryParams,
  countryCode,
}: {
  pageParam?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
  countryCode: string;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
}> {
  const page = Math.max(1, pageParam || 1);
  const limit = queryParams?.limit || 12;
  const offset = (page - 1) * limit;
  const region = await getRegion(countryCode);

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }
  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        query: {
          limit,
          offset,
          region_id: region.id,
          fields: '*variants.calculated_price',
          ...queryParams,
        },
        next: { tags: ['products'] },
        cache: 'force-cache',
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? page + 1 : null;

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      };
    });
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export async function getProductsListWithSort({
  page = 0,
  queryParams,
  sortBy = 'created_at',
  countryCode,
}: {
  page?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  sortBy?: SortOptions;
  countryCode: string;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> {
  const limit = queryParams?.limit || 12;

  const {
    response: { products, count },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  });

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
}
