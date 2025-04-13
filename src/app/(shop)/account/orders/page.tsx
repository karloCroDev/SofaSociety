// TODO:
// 1. Imaš console error na ovoj stranici. Molim te da prođeš sve stranice i provjeriš da li imaš još sličnih problema.
// 2. Sidebar na ovoj stranici treba biti fiksan, dok se samo sadržaj s desne strane može "skrolati".
// 3. Također, sidebar mora ići skroz do kraja prozora lijevo, trenutno imaš nekakav razmak.
// 4. Točke 2. i 3. također vrijede za `/account/orders/order` i `/account/personal-and-security` stranice.

// External packages
import Image from 'next/image';

// Components
import { Icon } from '@/components/ui/Icon';
import { Tag } from '@/components/ui/Tag';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

// Assets
import ImageExample from '@/public/images/home/modern-luxe.png';

export default function Orders() {
  return (
    <>
      <h1 className="text-xl font-semibold">My orders</h1>

      {/* <p className="mt-16 text-lg">You haven't ordered anything</p> */}
      <div className="mt-16">
        {[...Array(8)].map((_, i: number) => (
          <OrderCard
            key={i}
            orderId="000000004"
            orderDate="29 December 2024"
            status={
              <Tag iconLeft={<Icon name="package" className="size-3" />}>
                Packing{' '}
              </Tag>
            }
            productImages={
              <div className="ml-auto h-24 w-20">
                <Image
                  src={ImageExample}
                  alt="Example image"
                  className="h-full w-full object-cover"
                />
              </div>
            }
          />
        ))}
      </div>
    </>
  );
}
const OrderCard: React.FC<{
  orderId: string;
  status: React.ReactNode;
  orderDate: string;
  productImages: React.ReactNode;
}> = ({ orderId, status, orderDate, productImages }) => (
  <div className="mb-4 rounded border border-gray-200 p-4">
    <div className="flex">
      <div>
        {/* TODO: Pari mi da ti je ovaj `<div>` na liniji ispod višak. FIXED*/}

        <div className="text-lg">
          <h4 className="font-bold">Order:</h4>
          <p>{orderId}</p>
        </div>

        <p className="text-gray-500">Order date: {orderDate}</p>
      </div>
      <div className="ml-auto h-24 w-20">{productImages}</div>
    </div>

    <div className="mt-8 flex items-center justify-between">
      {status}
      <LinkAsButton href="/account/orders/order" variant="outline">
        Check status
      </LinkAsButton>
    </div>
  </div>
);
