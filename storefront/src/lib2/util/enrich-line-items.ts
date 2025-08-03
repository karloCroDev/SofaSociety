import 'server-only';

// External packages
import { HttpTypes } from '@medusajs/types';
import { omit } from 'lodash';

import { getProductsById } from '@/lib/data/products';

export async function enrichLineItems<
  T extends HttpTypes.StoreCartLineItem[] | HttpTypes.StoreOrderLineItem[],
>(lineItems: T | null, regionId: string): Promise<T> {
  if (!lineItems) return [] as unknown as T;

  const queryParams = {
    ids: lineItems.map((lineItem) => lineItem.product_id!),
    regionId: regionId,
  };

  const products = await getProductsById(queryParams);

  if (!lineItems?.length || !products) {
    return [] as unknown as T;
  }

  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p) => p.id === item.product_id);
    const variant = product?.variants?.find((v) => v.id === item.variant_id);

    if (!product || !variant) {
      return item;
    }

    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, 'variants'),
      },
    };
  }) as T;

  return enrichedItems;
}
