'use server';

// External packages
import { PaymentMethod } from '@stripe/stripe-js';
import {
  ChoosePaymentMethodOption,
  EmailFormArgs,
  ShippingOptionCheckoutArgs,
} from '@/hooks2/checkout';
import { CustomerAddressArgs } from '@/hooks2/user-settings';
import { getAuthHeaders } from '@/lib/data/cookies';
import { medusaError } from '@/lib2/util/medusa-error';
import { sdk } from '@/lib2/config/config';
import { getCartId, removeCartId } from '@/lib2/data/cookies';
import { HttpTypes } from '@medusajs/types';
import { revalidateTag } from 'next/cache';
import { getCart } from '@/lib2/data/cart';

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

export async function getAllShippingOptions(cartId: string) {
  try {
    const { shipping_options } = await sdk.store.fulfillment.listCartOptions({
      cart_id: cartId,
    });
    return shipping_options;
  } catch (error) {
    medusaError(error);
  }
}

export async function shippingOptionCheckout({
  cartId,
  optionId,
}: ShippingOptionCheckoutArgs) {
  try {
    await sdk.store.cart.addShippingMethod(cartId, {
      option_id: optionId,
    });
  } catch (error) {
    medusaError(error);
  }
}

// Credit card handling

export async function placeOrder() {
  const cartId = await getCartId();
  if (!cartId) {
    throw new Error('No existing cart found when placing an order');
  }

  try {
    const result = await sdk.store.cart.complete(
      cartId,
      {},
      await getAuthHeaders()
    );

    revalidateTag('cart');

    if (result?.type === 'order') {
      await removeCartId();
    }

    return result;
  } catch (error) {
    medusaError(error);
  }
}

export async function listPaymentProviders(regionId?: string) {
  if (!regionId) throw new Error('Region not found');
  try {
    const { payment_providers } = await sdk.store.payment.listPaymentProviders({
      region_id: regionId,
    });

    return payment_providers;
  } catch (error) {
    medusaError(error);
  }
}

export async function getPaymentMethod(id?: string) {
  if (!id) throw new Error('Method id not found');
  try {
    const response = await sdk.client.fetch<PaymentMethod>(
      `/store/custom/stripe/get-payment-method/${id}`
    );
    return response;
  } catch (error) {
    medusaError(error);
  }
}

export async function choosePaymentMethod({
  sessionId,
  token,
}: ChoosePaymentMethodOption) {
  try {
    const resp = await sdk.client.fetch(
      '/store/custom/stripe/set-payment-method',
      {
        method: 'POST',
        body: { session_id: sessionId, token },
      }
    );

    revalidateTag('cart');
    return resp;
  } catch (err) {
    medusaError(err);
  }
}

export async function initiatePaymentSession(provider_id: string) {
  const cart = await getCart();

  if (!cart) {
    throw new Error("Can't initiate payment without cart");
  }

  try {
    const { payment_collection } =
      await sdk.store.payment.initiatePaymentSession(
        cart,
        {
          provider_id,
        },
        {},
        await getAuthHeaders()
      );
    return payment_collection;
  } catch (error) {
    medusaError(error);
  }
}
