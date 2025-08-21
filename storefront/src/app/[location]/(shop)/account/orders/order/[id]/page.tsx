// External packages
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

// Lib
import { retrieveOrder } from '@/lib/data/orders';
import { convertToLocale } from '@/lib/util/money';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: PageProps) {
  // Handling if customer exists in layout!
  const { id } = await params;
  const order = await retrieveOrder(id);

  const shippingAddress = order.shipping_address;
  const billingAddress = order.billing_address;
  const fulfillmentStatus = order.fulfillment_status;
  return (
    <>
      <h1 className="text-xl font-semibold">
        Order:
        {order.id.startsWith('order_') ? order.id.split('order_')[1] : order.id}
      </h1>
      <div className="mt-16 rounded border border-gray-200 p-4">
        <div className="flex gap-2">
          <p className="text-gray-500">Estimate delivery: </p>
          <p>{new Date(order.created_at).toLocaleDateString()}</p>
        </div>

        <div className="mt-4 flex items-center xl:mt-8">
          {fulfillmentStatus === 'canceled' ? (
            <Tag iconLeft={<Icon name="plus" className="size-3 rotate-45" />}>
              Delivering
            </Tag>
          ) : (
            <>
              <Tag
                iconLeft={
                  <Icon
                    name="package"
                    className="size-3"
                    color={
                      fulfillmentStatus === 'partially_shipped'
                        ? 'black'
                        : 'gray'
                    }
                  />
                }
              >
                Packing
              </Tag>
              <div className="h-px w-4 bg-gray-900"></div>
              <Tag
                colorScheme={
                  fulfillmentStatus === 'shipped' ||
                  fulfillmentStatus === 'partially_shipped' ||
                  fulfillmentStatus === 'partially_delivered'
                    ? 'black'
                    : 'gray'
                }
                iconLeft={
                  <Icon name="package" className="size-3 text-gray-900" />
                }
              >
                Delivering
              </Tag>
              <div className="h-px w-4 bg-gray-900"></div>
              <Tag
                colorScheme={
                  fulfillmentStatus === 'delivered' ? 'black' : 'gray'
                }
                iconLeft={
                  <Icon name="package" className="size-3 text-gray-900" />
                }
              >
                Delivered
              </Tag>
              <Button variant="outline" className="ml-auto hidden xl:block">
                Check status
              </Button>
            </>
          )}
        </div>
        <Button variant="outline" className="ml-auto mt-4 xl:hidden">
          Check status
        </Button>
      </div>

      <div className="mt-6 flex items-center justify-between rounded border border-gray-200 p-4">
        <Icon name="calendar" className="size-4" />
        <p className="ml-4 text-gray-200">Order date </p>
        <p className="ml-auto">
          {/* mock date */}
          {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-6 flex gap-4">
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
            <div key={item.id}>
              <Link href={`/product/${item.product_handle}`} className="flex">
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

                  {item.variant?.options?.map((option) => (
                    <p>
                      <span className="pr-2 text-gray-500">
                        {option.option?.title}
                      </span>
                      {option.value}
                    </p>
                  ))}

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
                <div className="my-4 h-px bg-gray-100" key={item.id} />
              )}
            </div>
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
    </>
  );
}
