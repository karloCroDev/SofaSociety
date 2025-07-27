'use client';

// Lib
import { MeiliSearchProductHit, searchClient } from '@/lib2/search-client';
import { getProductsById } from '@/lib/data/products';

export async function getSearchItems({
  value,
  region,
}: {
  value: string;
  region?: string;
}) {
  const results = await searchClient
    .index('products')
    .search<MeiliSearchProductHit>(value, undefined);

  const medusaProducts = await getProductsById({
    ids: results.hits.map((h) => h.id),
    regionId: region!,
  });

  return medusaProducts;
}
