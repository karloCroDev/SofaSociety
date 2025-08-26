// External packages
import { HttpTypes } from '@medusajs/types';

// Lib

import { sdk } from '@/lib/config/config';
import { medusaError } from '@/lib/util/medusa-error';

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
