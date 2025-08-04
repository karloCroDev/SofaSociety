'use server';

// External packages
import { revalidateTag } from 'next/cache';

// Lib
import { sdk } from '@/lib2/config';
import { getAuthHeaders, removeCartId } from '@/lib/data/cookies';

export async function completeCartServer(cartId: string) {
  try {
  } catch (error) {}
  const result = await sdk.store.cart.complete(
    cartId,
    {},
    await getAuthHeaders()
  );

  if (result.type === 'cart') {
    throw new Error(result.error?.message || 'Failed to complete cart');
  }

  if (result.type === 'order') {
    revalidateTag('cart');
    revalidateTag('orders');
    await removeCartId();

    return { success: true, order: result.order };
  }

  return { success: false };
}
