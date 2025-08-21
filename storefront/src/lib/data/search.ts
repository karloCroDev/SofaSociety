'use client';

// Lib
import {
  MeiliSearchProductHit,
  searchClient,
} from '@/lib/config/search-client';
import { getProductsById } from '@/lib/data/products';

export async function getSearchItems({
  value,
  region,
}: {
  value: string;
  region?: string;
}) {
  if (!region) throw new Error('Enter the region');
  try {
    const results = await searchClient
      .index('products')
      .search<MeiliSearchProductHit>(value, undefined);

    const medusaProducts = await getProductsById({
      ids: results.hits.map((h) => h.id),
      regionId: region,
    });

    return medusaProducts;
  } catch (error) {
    if (typeof error === 'string') throw new Error(error);
  }
}
