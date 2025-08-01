'use server';

// External packages
import { revalidateTag } from 'next/cache';
import { HttpTypes } from '@medusajs/types';

// Hooks
import {
  AddItemToCartArgs,
  DeleteItemArgs,
  UpdateCartItemArgs,
} from '@/hooks2/cart';

// Lib
import { getAuthHeaders, getCartId } from '@/lib2/data/cookies';
import { getRegion } from '@/lib/data/regions';
import { enrichLineItems } from '@/lib/util/enrich-line-items';
import medusaError from '@/lib/util/medusa-error';
import { sdk } from '@/lib2/config';
import { setCartId } from '@/lib2/data/cookies';

export async function getCart() {
  const id = await getCartId();
  if (!id) return;

  try {
    // Ante: Je li mogu ovako passati argumente, uz auth Headers ili moram fetchati. Ne pise nista u dokumentaciji, ali radi sasvim oke.
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

    // Ante: Pretpostvljam da ovo koristite na svim projektima paaa nisam htio mjenjati funkciju enrichLineItems
    cart.items = await enrichLineItems(cart.items, cart.region_id);

    return cart;
  } catch (error) {
    medusaError(error);
  }
}

async function initializeCart(location?: string) {
  if (!location) {
    throw new Error('Enter the location bro');
  }

  const region = await getRegion(location);

  if (!region) {
    throw new Error('Mann your living on north pole :(((((');
  }

  try {
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
  const id = await getCartId();

  if (!id) return;

  const doesCartExist = await initializeCart(location);

  if (!doesCartExist) throw new Error('Cart already exists');

  console.log(variant_id, quantity);
  try {
    await sdk.store.cart.createLineItem(
      id,
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

export async function updateCartItem({
  quantity,
  lineItemId,
}: UpdateCartItemArgs) {
  const id = await getCartId();
  if (!id) throw new Error('Cart not found');

  if (!lineItemId || !Number.isSafeInteger(quantity))
    throw new Error('Invalid data');

  try {
    await sdk.store.cart.updateLineItem(
      id,
      lineItemId,
      {
        quantity,
      },
      {},
      await getAuthHeaders()
    );
    revalidateTag('cart');
  } catch (error) {
    medusaError(error);
  }
}

export async function deleteCartItem({ lineItemId }: DeleteItemArgs) {
  const cartId = await getCartId();

  if (!cartId) throw new Error('Cart not found');

  if (!lineItemId) throw new Error('Line item not found');

  try {
    await sdk.store.cart.deleteLineItem(
      cartId,
      lineItemId,
      await getAuthHeaders()
    );
    revalidateTag('cart');
  } catch (error) {
    medusaError(error);
  }
}
