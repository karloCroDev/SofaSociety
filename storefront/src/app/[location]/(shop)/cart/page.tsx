// External packages
import Image from 'next/image';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

// Assets
import { AddToCart } from '@/components/shop/AddToCart';
import { redirect } from 'next/navigation';
import { getCartId } from '@/lib/data/cookies';
import { retrieveCart } from '@/lib/data/cart';
import { getPricesForVariant } from '@/lib/util/get-product-price';
import { getVariantItemsInStock } from '@/lib/util/inventory';
import { Products } from '@/components/shop/cart/Products';
import { getCart } from '@/lib2/data/cart';
import { getCustomer } from '@/lib2/data/auth';
import { HttpTypes } from '@medusajs/types';

export default async function CartPage() {
  const customer = await getCustomer();
  if (!customer) redirect('/login');

  const cart = await getCart();

  return (
    <Layout className="mt-28 lg:mt-32">
      <LayoutRow>
        <LayoutColumn xs={12} lg={9} className="lg:pr-6">
          <h1 className="mb-8 text-xl font-semibold lg:mb-12 lg:text-2xl 2xl:text-3xl">
            Shopping cart
          </h1>

          {cart?.items?.length ? (
            cart.items.map((item, i) => {
              const { original_price, calculated_price } = item.variant
                ? (getPricesForVariant(item.variant) ?? {})
                : {};

              return (
                <Products
                  itemId={item.id}
                  name={item.product_title || ''}
                  color={item.variant?.title || ''}
                  image={
                    <div className="relative h-full w-28">
                      <Image
                        src={item.variant?.product?.thumbnail || ''}
                        alt="XXX product"
                        className="h-full w-full object-cover"
                        fill
                      />
                    </div>
                  }
                  price={original_price!}
                  originalPrice={
                    original_price !== calculated_price
                      ? calculated_price
                      : undefined
                  }
                  amount={item.quantity}
                  maxAmount={
                    item.variant ? getVariantItemsInStock(item.variant) : 0
                  }
                  key={i}
                />
              );
            })
          ) : (
            <p className="text-md">Currently you have not ordered anything</p>
          )}
        </LayoutColumn>

        <LayoutColumn xs={12} lg={3} className="lg:pl-6">
          <div className="lg:sticky lg:top-40">
            <hr className="mt-6 h-px border-0 bg-gray-200 lg:hidden" />
            <div className="mt-8 flex flex-row justify-between lg:mt-5 2xl:mt-8">
              <p>Subtotal:</p>
              <p className="text-gray-500">{cart?.item_subtotal}€</p>
            </div>
            <div className="mt-4 flex flex-row justify-between">
              <p>Shipping:</p>
              <p className="text-gray-500">{cart?.shipping_total || 'Free'}</p>
            </div>
            <hr className="mt-6 h-px border-0 bg-gray-200" />
            <div className="mt-6 flex flex-row justify-between text-lg font-bold">
              <h4>Total:</h4>
              <p>{cart?.total}€</p>
            </div>
            <div className="mt-10 flex flex-row justify-between gap-4">
              <Input label="Discount code" />
              <Button isVisuallyDisabled>Apply</Button>
            </div>
            {!cart?.items?.length ? (
              <Button isVisuallyDisabled disabled className="mt-6 w-full">
                Proceed to checkout
              </Button>
            ) : (
              <LinkAsButton href="/checkout" className="mt-6 w-full">
                Proceed to checkout
              </LinkAsButton>
            )}
          </div>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
