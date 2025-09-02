'use client';

// External packages
import * as React from 'react';
// import { useQueryClient } from '@tanstack/react-query';
import { HttpTypes } from '@medusajs/types';

// Hooks
import { useCart } from '@/hooks/cart';
import { getPricesForVariant } from '@/lib/util/money';
import { Products } from '@/components/shop/cart/Products';
import Image from 'next/image';
import { withReactQueryProvider } from '@/lib/config/react-query';

export const ItemMapping: React.FC<{
  cart: HttpTypes.StoreCart | undefined;
}> = withReactQueryProvider(({ cart }) => {
  // const queryClient = useQueryClient();
  const { data: clientCart } = useCart({
    initialData: cart,
  });

  return clientCart?.items?.length ? (
    clientCart.items.map((item, i) => {
      const { original_price, calculated_price } = item.variant
        ? (getPricesForVariant(item.variant) ?? {})
        : {};

      return (
        <Products
          cart={clientCart}
          itemId={item.id}
          name={item.product_title}
          color={item.variant?.title ? item.variant.title : undefined}
          image={
            item.variant?.product?.thumbnail && (
              <div className="relative h-full w-28">
                <Image
                  src={item.variant.product.thumbnail}
                  alt="XXX product"
                  className="h-full w-full object-cover"
                  fill
                />
              </div>
            )
          }
          price={original_price!}
          originalPrice={
            original_price !== calculated_price ? calculated_price : undefined
          }
          amount={item.quantity}
          maxAmount={
            item.variant?.inventory_quantity || Number.MAX_SAFE_INTEGER
          }
          key={i}
        />
      );
    })
  ) : (
    <p className="text-md">Currently you have not ordered anything</p>
  );
});
