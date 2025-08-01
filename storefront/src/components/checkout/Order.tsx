'use client';

// External packages
import Image from 'next/image';
import Link from 'next/link';
import { HttpTypes } from '@medusajs/types';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Lib
import { getPricesForVariant } from '@/lib/util/get-product-price';

export const Order: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => {
  return (
    <div className="px-8 pb-8 sm:px-12 lg:px-0 lg:pb-0">
      <div className="flex justify-between lg:mb-16">
        <p>Order - {cart.items?.length}</p>

        <Link
          href="/cart"
          className="cursor-pointer underline underline-offset-4 outline-none"
        >
          Edit card
        </Link>
      </div>
      {cart.items?.map((item) => {
        const { original_price, calculated_price } = item.variant
          ? (getPricesForVariant(item.variant) ?? {})
          : {};
        return (
          <div className="mt-8 flex gap-3" key={item.id}>
            <div className="relative h-40 w-32 bg-white lg:bg-transparent">
              <Image src={item.thumbnail || ''} alt="Example" fill />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <h4 className="font-bold">{item.title}</h4>
              <ul>
                <li className="text-2xs md:text-base">
                  Variant: {item.variant?.title}
                </li>
                <li className="text-2xs md:text-base">
                  Quantity: {item.quantity}
                </li>
              </ul>
            </div>

            <p>{calculated_price}</p>

            {original_price !== calculated_price && (
              <p className="text-sm text-red-400 line-through">
                {original_price}
              </p>
            )}
          </div>
        );
      })}

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:gap-8">
        <Input label="Discount code" inputProps={{ className: 'h-12' }} />
        <Button isVisuallyDisabled>Apply</Button>
      </div>
      <div className="mt-8 flex justify-between text-sm md:text-base">
        <p>Subtotal</p>
        <p>{cart.subtotal}€</p>
      </div>
      <div className="mt-2 flex justify-between text-sm md:text-base">
        <p>Taxes</p>
        <p>{cart.tax_total}€</p>
      </div>

      {!!cart.discount_total && (
        <div className="mt-2 flex justify-between text-sm md:text-base">
          <p>Coupon applied</p>
          <p className="text-red-400">{cart.discount_total}€</p>
        </div>
      )}
      <div className="mt-2 flex justify-between text-sm md:text-base">
        <p>Shipping</p>
        <p> {`${cart.shipping_total}€` || 'Free'}</p>
      </div>
      <div className="mt-6 flex justify-between text-lg">
        <p>Total</p>
        <p> {cart.total}€</p>
      </div>
    </div>
  );
};
