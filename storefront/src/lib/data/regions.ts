'use server';

// External packages
import { revalidateTag } from 'next/cache';
import { HttpTypes } from '@medusajs/types';

// Lib
import { UpdateRegionArgs } from '@/hooks/cart';
import { sdk } from '@/lib/config/config';
import { medusaError } from '@/lib/util/medusa-error';
import { getCartId } from '@/lib/data/cookies';
import { updateCart } from '@/lib/data/checkout';

export async function allRegions() {
  try {
    const { regions } = await sdk.client.fetch<{
      regions: HttpTypes.StoreRegion[];
    }>(`/store/regions`, {
      next: { tags: ['regions'] },
      cache: 'force-cache',
    });

    return regions;
  } catch (error) {
    medusaError(error);
  }
}

const regionMap: Record<string, HttpTypes.StoreRegion> = {};

export const getRegion = async function (countryCode: string) {
  try {
    if (!countryCode) throw new Error('Country code is required');
    if (regionMap[countryCode]) {
      return regionMap[countryCode];
    }

    const regions = await allRegions();

    if (!regions) {
      return null;
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        const code = c?.iso_2 ?? '';
        if (code) {
          regionMap[code] = region;
        }
      });
    });

    const region =
      countryCode && regionMap[countryCode]
        ? regionMap[countryCode]
        : regionMap['us'];

    return region;
  } catch (error) {
    medusaError(error);
  }
};

export async function updateRegion({
  countryCode,
  currentPath,
}: UpdateRegionArgs) {
  if (typeof countryCode !== 'string' || typeof currentPath !== 'string') {
    throw new Error('Invalid country code or current path');
  }

  const [cartId, region] = await Promise.all([
    getCartId(),
    getRegion(countryCode),
  ]);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (cartId) {
    await updateCart({ region_id: region.id });
    revalidateTag('cart');
  }

  revalidateTag('regions');
  revalidateTag('products');
}
