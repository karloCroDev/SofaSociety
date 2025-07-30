import { getAuthHeaders, getCartId } from '@/lib/data/cookies';
import { enrichLineItems } from '@/lib/util/enrich-line-items';
import { sdk } from '@/lib2/config';

export async function getCart() {
  const id = await getCartId();
  if (!id) return;

  // Ante: Can I pass arguments like this, I am not getting any errors by next
  const { cart } = await sdk.store.cart.retrieve(
    id,
    {},
    {
      next: { tags: ['cart'] }, // NEXT TAG: cart
      cache: 'no-store',
      ...(await getAuthHeaders()),
    }
  );

  if (!cart || !cart.items || !cart.region_id) return;

  cart.items = await enrichLineItems(cart.items, cart.region_id);

  return cart;
}
