// External packages
import { HttpTypes } from '@medusajs/types';

// Lib
import { sdk } from '@/lib/config/config';
import { medusaError } from '@/lib/util/medusa-error';

export async function allCategories() {
  try {
    const { product_categories } = await sdk.store.category.list();
    return product_categories;
  } catch (error) {
    medusaError(error);
  }
}

export async function getSpecificCategories({
  offset = 0,
  limit = 100,
  fields,
}: {
  offset?: number;
  limit?: number;
  fields?: (keyof HttpTypes.StoreProductCategory)[];
}) {
  try {
    const { product_categories } = await sdk.store.category.list({
      limit,
      offset,
      fields: fields ? fields.join(',') : undefined,
    });
    return product_categories;
  } catch (error) {
    medusaError(error);
  }
}

export async function getCategoryByHandle({
  handle,
  fields,
}: {
  handle: string;
  fields?: (keyof HttpTypes.StoreProductCategory)[];
}) {
  try {
    if (!handle)
      return {
        error: 'Handle is required',
      };
    const { product_categories } = await sdk.store.category.list({
      handle,
      fields: fields ? fields.join(',') : undefined,
    });
    return product_categories;
  } catch (error) {
    medusaError(error);
  }
}
