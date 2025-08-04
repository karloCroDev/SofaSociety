// External packages
import { HttpTypes } from '@medusajs/types';

// Lib
import { sdk } from '@/lib2/config';

// Shipping actions
export const listCartShippingMethods = async function (cartId: string) {
  return sdk.client
    .fetch<HttpTypes.StoreShippingOptionListResponse>(
      `/store/shipping-options`,
      {
        query: { cart_id: cartId },
        next: { tags: ['shipping'] },
        cache: 'force-cache',
      }
    )
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null;
    });
};

// Ante: Je li mogu provideati dodatne opcije poput cache ili query na ovaj nacin ispod, nisam našao ništa konkretno u dokumentaciji

//   try {
//     const { shipping_options } = await sdk.store.fulfillment.listCartOptions({
//       cart_id: cartId,
//     });
//     return shipping_options;
//   } catch (error) {}
// };
