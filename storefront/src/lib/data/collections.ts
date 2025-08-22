// External packages
import { HttpTypes } from '@medusajs/types';

// Lib
import { sdk } from '@/lib/config/config';
import { getProductsList } from '@/lib/data/products';
import { medusaError } from '@/lib/util/medusa-error';

export async function getCollection(id: string) {
  try {
    if (!id) throw new Error('Collection ID is required');
    const { collection } = await sdk.store.collection.retrieve(id);

    if (collection) return collection;
  } catch (error) {
    medusaError(error);
  }
}

export async function getCollectionsList({
  offset = 0,
  limit = 100,
  fields,
}: {
  limit?: number;
  offset?: number;
  fields?: (keyof HttpTypes.StoreCollection)[];
}) {
  try {
    const { collections, count } = await sdk.store.collection.list({
      limit,
      offset,
      fields: fields ? fields.join(',') : undefined,
    });
    return { collections, count };
  } catch (error) {
    medusaError(error);
  }
}

export const getCollectionByHandle = async function ({
  handle,
  fields,
}: {
  handle: string;
  fields?: (keyof HttpTypes.StoreCollection)[];
}): Promise<HttpTypes.StoreCollection> {
  try {
    if (!handle) throw new Error('Handle is required');
    const { collections } = await sdk.store.collection.list({
      limit: 1,
      handle,
      fields: fields ? fields.join(',') : undefined,
    });
    return collections[0];
  } catch (error) {
    medusaError(error);
  }
};

export async function getCollectionsWithProducts(
  countryCode: string
): Promise<HttpTypes.StoreCollection[] | null> {
  const { collections } = await getCollectionsList({
    limit: 3,
  });

  if (!collections) {
    return null;
  }

  const collectionIds = collections
    .map((collection) => collection.id)
    .filter((collection) => collection !== undefined) as string[];

  const { response } = await getProductsList({
    queryParams: { collection_id: collectionIds },
    countryCode,
  });

  response.products.forEach((product) => {
    const collection = collections.find(
      (collection) => collection.id === product.collection_id
    );

    if (collection) {
      if (!collection.products) {
        collection.products = [];
      }

      collection.products.push(product);
    }
  });

  return collections as unknown as HttpTypes.StoreCollection[];
}
