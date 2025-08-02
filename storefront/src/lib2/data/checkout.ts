'use server';

import { EmailFormArgs } from '@/hooks2/checkout';
import { CustomerAddressArgs } from '@/hooks2/user-settings';
import { getAuthHeaders } from '@/lib/data/cookies';
import medusaError from '@/lib/util/medusa-error';
import { sdk } from '@/lib2/config';
import { getCartId } from '@/lib2/data/cookies';
import { HttpTypes } from '@medusajs/types';
import { revalidateTag } from 'next/cache';

async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = await getCartId();
  if (!cartId) {
    throw new Error('No cart id :(');
  }

  try {
    const { cart } = await sdk.store.cart.update(
      cartId,
      data,
      {},
      await getAuthHeaders()
    );

    revalidateTag('cart');

    return cart;
  } catch (error) {
    medusaError(error);
  }
}
export async function emailCheckout({ email }: EmailFormArgs) {
  const cart = await updateCart({ email });

  if (!cart) {
    return {
      state: 'error' as const,
      message: 'Checkout email is not updated successfully',
    };
  }
  return {
    state: 'success' as const,
    message: 'Checkout email updated successfully',
  };
}

export async function addressCheckout(data: CustomerAddressArgs) {
  const cart = await updateCart({
    shipping_address: data,
    billing_address: data,
  });

  if (!cart) {
    return {
      state: 'error' as const,
      message: 'Checkout address is not updated successfully',
    };
  }
  return {
    state: 'success' as const,
    message: 'Email of cart updated successfully',
  };
}
export async function shippingOptionCheckout({ email }: EmailFormArgs) {
  const cart = await updateCart({ email });

  if (!cart) {
    return {
      state: 'error' as const,
      message: 'Cart is not updated successfully',
    };
  }
  return {
    state: 'success' as const,
    message: 'Email of cart updated successfully',
  };
}
