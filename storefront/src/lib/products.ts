import { sdk } from '@/lib/config';
import { HttpTypes } from '@medusajs/types';

export const getProductsById = async function ({
  ids,
  regionId,
}: {
  ids: string[];
  regionId: string;
}) {
  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[] }>(`/store/products`, {
      query: {
        id: ids,
        region_id: regionId,
        fields: '*variants.calculated_price,+variants.inventory_quantity',
      },
      next: { tags: ['products'] },
      cache: 'force-cache',
    })
    .then(({ products }) => products);
};

export const getProductByHandle = async function (
  handle: string,
  regionId: string
) {
  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[] }>(`/store/products`, {
      query: {
        handle,
        region_id: regionId,
        fields: '*variants.calculated_price,+variants.inventory_quantity',
      },
      next: { tags: ['products'] },
    })
    .then(({ products }) => products[0]);
};

export const getProductFashionDataByHandle = async function (handle: string) {
  return sdk.client.fetch<{
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
};

export const getProductsList = async function ({
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

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        query: {
          limit,
          offset,
          region_id: '',
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
};

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const getProductsListWithSort = async function ({
  page = 0,
  queryParams,
  sortBy = 'created_at',
  countryCode,
}: {
  page?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  sortBy?: 'price_asc' | 'price_desc' | 'created_at'; // Karlo: Make this type
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

  //   const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = products.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};
