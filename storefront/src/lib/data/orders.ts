'use server';

// Lib
import { sdk } from '@/lib/config/config';
import { medusaError } from '@/lib/util/medusa-error';
import { enrichLineItems } from '@/lib/util/enrich-line-items';
import { getAuthHeaders } from '@/lib/data/cookies';

export async function retrieveOrder(id: string) {
  try {
    if (!id) throw new Error('Order ID is required');
    const { order } = await sdk.store.order.retrieve(
      id,
      {
        fields: '*payment_collections.payments',
      },
      await getAuthHeaders()
    );

    if (order.items?.length && order.region_id) {
      order.items = await enrichLineItems(order.items, order.region_id);
    }

    return order;
  } catch (error) {
    medusaError(error);
  }
}

export async function listOrders(limit: number = 10, offset: number = 0) {
  try {
    const listOrders = await sdk.store.order.list(
      { limit, offset },
      await getAuthHeaders()
    );

    return listOrders;
  } catch (error) {
    medusaError(error);
  }
}
