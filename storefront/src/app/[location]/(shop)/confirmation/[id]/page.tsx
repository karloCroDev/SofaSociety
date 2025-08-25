// External packages
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Components
import { Icon } from '@/components/ui/Icon';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

// Lib
import { retrieveOrder } from '@/lib/data/orders';
import { getCustomer } from '@/lib/data/auth';
import { convertToLocale } from '@/lib/util/money';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function Confirmation({ params }: PageProps) {
  const customer = await getCustomer();
  if (!customer) {
    redirect(`/`);
  }
  const { id } = await params;
  const order = await retrieveOrder(id);

  const shippingAddress = order.shipping_address;
  const billingAddress = order.billing_address;

  return (
    <Layout className="mt-28 lg:mt-32">
      <LayoutRow className="justify-center">
        <LayoutColumn
          lg={6}
          className="xl:min-h-[calc(100vh-128px-144px-340px)]"
        >
          <h1 className="text-3xl font-semibold">Thank you for your order!</h1>
          <p className="mt-7">
            We are pleased to confirm that your order has been successfully
            placed and will be processed shortly.
          </p>
          <p>
            We have sent you the receipt and order details via{' '}
            <strong>e-mail.</strong>
          </p>
          <p>
            Your order number is <strong>#{order.display_id}</strong>
          </p>

          <LinkAsButton href="/" className="mb-16 mt-8 w-fit">
            Back to home
          </LinkAsButton>

          <div className="flex gap-4">
            <div className="flex-1 rounded border border-gray-200 p-4">
              <div className="flex items-center gap-4">
                <Icon name="map" />
                <p className="text-gray-500">Delivery address</p>
              </div>

              <p className="mt-8">
                {shippingAddress?.first_name} {shippingAddress?.last_name}
              </p>
              <p>
                {shippingAddress?.address_1}, {shippingAddress?.postal_code}{' '}
                {shippingAddress?.city}
              </p>
              <p>{shippingAddress?.country?.toString() ?? ''}</p>
              <p>{shippingAddress?.phone}</p>
            </div>
            <div className="flex-1 rounded border border-gray-200 p-4">
              <div className="flex items-center gap-4">
                <Icon name="map" />
                <p className="text-gray-500">Billing address</p>
              </div>

              <p className="mt-8">
                {billingAddress?.first_name} {billingAddress?.last_name}
              </p>
              <p>
                {billingAddress?.address_1}, {billingAddress?.postal_code}{' '}
                {billingAddress?.city}
              </p>
              <p>{billingAddress?.country?.toString() ?? ''}</p>
              <p>{billingAddress?.phone}</p>
            </div>
          </div>

          <div className="border-200 mt-5 rounded border p-4">
            {order.items &&
              order.items.map((item, index) => (
                <>
                  <Link
                    key={item.id}
                    href={`/product/${item.product_handle}`}
                    className="flex"
                  >
                    {item.thumbnail && (
                      <div className="relative h-52 w-36">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-col pl-8 text-sm md:text-base">
                      <h4 className="text-lg">{item.title}</h4>

                      {item.variant?.options?.map(
                        ({ option, option_id, value }) => (
                          <p key={option_id}>
                            <span className="pr-2 text-gray-500">
                              {option?.title}
                            </span>
                            {value}
                          </p>
                        )
                      )}

                      <p className="md:mt-auto">
                        <span className="pr-2 text-gray-500">Quantity:</span>
                        {item.quantity}
                      </p>

                      <p className="mt-auto text-base md:hidden">
                        {convertToLocale({
                          currency_code: order.currency_code,
                          amount: item.total,
                        })}
                      </p>
                    </div>
                    <div className="ml-auto mt-auto hidden sm:text-md md:block">
                      <p>
                        {convertToLocale({
                          currency_code: order.currency_code,
                          amount: item.total,
                        })}
                      </p>
                    </div>
                  </Link>
                  {order.items!.length - 1 !== index && (
                    <div className="my-4 h-px bg-gray-100" />
                  )}
                </>
              ))}
          </div>

          <div className="mt-6 flex flex-col items-center gap-y-5 rounded border border-gray-200 p-4 lg:flex-row lg:items-start">
            <div className="flex h-fit w-full items-center gap-2">
              <Icon name="credit-card" className="size-3" />
              <p className="text-gray-500">Payment</p>
            </div>
            <div>
              <div className="flex">
                <p className="text-gray-500">Subtotal</p>
                <p className="ml-40">€{order.item_subtotal}</p>
              </div>
              <div className="mt-2 flex">
                <p className="text-gray-500">Shipping</p>
                <p className="ml-40">€{order.shipping_total}</p>
              </div>
              <div className="mt-6 flex text-lg">
                <p>Total</p>
                <p className="ml-40">€{order.total}</p>
              </div>
              <p className="text-sm text-gray-500">Including 11.25 tax </p>
            </div>
          </div>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
