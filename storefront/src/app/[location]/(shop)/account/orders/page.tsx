// External packages
import Image from 'next/image';

// Components
import { Icon } from '@/components/ui/Icon';
import { Tag } from '@/components/ui/Tag';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

// Lib
import { listOrders } from '@/lib2/data/orders';

export default async function OrdersPage() {
  const { orders } = await listOrders();
  console.log(orders);

  if (!orders)
    return <p className="mt-16 text-lg">You haven't ordered anything</p>;

  return (
    <>
      <h1 className="text-xl font-semibold">My orders</h1>

      <div className="mt-16 lg:min-h-[calc(100vh-128px-144px-340px)]">
        {orders.map((order, i: number) => (
          <OrderCard
            key={i}
            orderId={
              order.id.includes('order_')
                ? order.id.split('order_')[1]
                : order.id
            }
            orderHandle={order.id}
            // mock date
            orderDate={new Date(order.created_at).toLocaleDateString()}
            status={<GetOrderStatusTag status={order.fulfillment_status} />}
            productImages={
              order.items &&
              order.items[0].thumbnail && (
                <div className="relative ml-auto h-24 w-20">
                  <Image
                    src={order.items[0].thumbnail}
                    alt={order.items[0].thumbnail}
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
              )
            }
          />
        ))}
      </div>
    </>
  );
}
const OrderCard: React.FC<{
  orderId: string;
  orderHandle: string;
  status: React.ReactNode;
  orderDate: string;
  productImages: React.ReactNode;
}> = ({ orderId, orderHandle, status, orderDate, productImages }) => {
  return (
    <div className="mb-4 rounded border border-gray-200 p-4">
      <div className="flex">
        <div>
          {/* TODO: Pari mi da ti je ovaj `<div>` na liniji ispod višak. FIXED*/}

          <div className="lg:text-md">
            <h4 className="font-bold">Order:</h4>
            <p>{orderId}</p>
          </div>

          <p className="text-gray-500">Order date: {orderDate}</p>
        </div>
        <div className="ml-auto h-24 w-20">{productImages}</div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        {status}
        <LinkAsButton
          href={`/account/orders/order/${orderHandle}`}
          variant="outline"
        >
          Check status
        </LinkAsButton>
      </div>
    </div>
  );
};

const GetOrderStatusTag: React.FC<{
  status: string;
}> = ({ status }) => {
  switch (status) {
    case 'canceled':
      return (
        <Tag iconLeft={<Icon name="close" className="size-3" />}>Canceled</Tag>
      );

    case 'delivered':
      return (
        <Tag iconLeft={<Icon name="checkmark" className="size-3" />}>
          Delivered
        </Tag>
      );

    case 'shipped':
    case 'partially_shipped':
      return (
        <Tag iconLeft={<Icon name="truck" className="size-3" />}>Shipped</Tag>
      );

    default:
      return (
        <Tag iconLeft={<Icon name="truck" className="size-3" />}>
          Delivering
        </Tag>
      );
  }
};
