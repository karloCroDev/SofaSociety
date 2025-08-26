'use server';

// External packages
import { revalidateTag } from 'next/cache';

// Hooks
import {
  AddItemToCartArgs,
  deleteCartItemSchema,
  DeleteItemArgs,
  UpdateCartItemArgs,
  updateCartSchema,
  UpdateRegionArgs,
} from '@/hooks/cart';

// Lib
import { getAuthHeaders, getCartId } from '@/lib/data/cookies';
import { getRegion } from '@/lib/data/regions';
import { enrichLineItems } from '@/lib/util/enrich-line-items';
import { medusaError } from '@/lib/util/medusa-error';
import { sdk } from '@/lib/config/config';
import { setCartId } from '@/lib/data/cookies';
import { updateCart } from '@/lib/data/checkout';

export async function getCart() {
  const id = await getCartId();
  if (!id) return;

  try {
    const { cart } = await sdk.store.cart.retrieve(
      id,
      {},
      {
        ...(await getAuthHeaders()),
        next: { tags: ['cart'] },
        // Ante: Next 15 sada sve forsira da je dynamic paaa ne moram
      }
    );

    if (!cart || !cart.items || !cart.region_id) return;

    cart.items = await enrichLineItems(cart.items, cart.region_id);

    return cart;
  } catch (error) {
    medusaError(error);
  }
}

async function initializeCart(location?: string) {
  try {
    if (!location) {
      throw new Error('Enter the location please');
    }

    const region = await getRegion(location);

    if (!region) {
      throw new Error('Mann your living on north pole :(');
    }
    let cart = await getCart();

    if (!cart) {
      const newCart = await sdk.store.cart.create(
        { region_id: region.id },
        {},
        await getAuthHeaders()
      );

      await setCartId(newCart.cart.id);

      cart = newCart.cart;
    }

    if (cart && cart?.region_id !== region.id) {
      await sdk.store.cart.update(
        cart.id,
        { region_id: region.id },
        {},
        await getAuthHeaders()
      );
    }
    revalidateTag('cart');
    return cart;
  } catch (error) {
    medusaError(error);
  }
}

export async function addItemToCart({
  location,
  quantity,
  variant_id,
}: AddItemToCartArgs) {
  // Ante: Posto quantity i variant_id dobivam od HttpTypes.StoreAddCartLineItem hocu li ih onda convertati u zod schemu ili da ovako ostavim

  if (!location && !quantity && !variant_id) throw new Error('Invalid data');

  const doesCartExist = await initializeCart(location);

  try {
    await sdk.store.cart.createLineItem(
      doesCartExist.id,
      {
        quantity,
        variant_id,
      },
      {},
      await getAuthHeaders()
    );
    revalidateTag('cart');
  } catch (error) {
    medusaError(error);
  }
}

export async function updateCartItem(data: UpdateCartItemArgs) {
  const validatedData = updateCartSchema.safeParse(data);

  if (!validatedData.success) throw new Error('Invalid data');

  const id = await getCartId();
  if (!id) throw new Error('Cart not found');

  try {
    await sdk.store.cart.updateLineItem(
      id,
      validatedData.data.lineItemId,
      {
        quantity: validatedData.data.quantity,
      },
      {},
      await getAuthHeaders()
    );
    revalidateTag('cart');
  } catch (error) {
    medusaError(error);
  }
}

export async function deleteCartItem(data: DeleteItemArgs) {
  const validatedData = deleteCartItemSchema.safeParse(data);

  if (!validatedData.success) return;

  const cartId = await getCartId();

  if (!cartId) throw new Error('Cart not found');

  try {
    await sdk.store.cart.deleteLineItem(
      cartId,
      validatedData.data.lineItemId,
      await getAuthHeaders()
    );
    revalidateTag('cart');
  } catch (error) {
    medusaError(error);
  }
}

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
