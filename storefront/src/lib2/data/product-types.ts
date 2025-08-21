// External packages
import { HttpTypes, PaginatedResponse } from '@medusajs/types';

// Lib
import { sdk } from '@/lib2/config/config';
import { medusaError } from '@/lib2/util/medusa-error';

export async function getSpecificProductType({
  offset = 0,
  limit = 100,
  fields,
}: {
  offset?: number;
  limit?: number;
  fields?: (keyof HttpTypes.StoreProductType)[];
}) {
  try {
    const { product_types, count } = await sdk.client.fetch<
      PaginatedResponse<{
        product_types: HttpTypes.StoreProductType[];
        count: number;
      }>
    >('/store/custom/product-types', {
      query: { limit, offset, fields: fields ? fields.join(',') : undefined },
      cache: 'force-cache',
    });

    return {
      product_types,
      count,
    };
  } catch (error) {
    // Ante: Je li mogu ovako handleati error ako je ovo naša api ruta?
    medusaError(error);
  }
}

export async function getTypesProductHandle(handle: string) {
  try {
    const { product_types } = await sdk.client.fetch<
      PaginatedResponse<{
        product_types: HttpTypes.StoreProductType[];
        count: number;
      }>
    >('/store/custom/product-types', {
      query: { handle, limit: 1 },
      cache: 'force-cache',
    });

    return product_types[0];
  } catch (error) {
    medusaError(error);
  }
}
