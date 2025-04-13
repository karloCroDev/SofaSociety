// External packages
import Image from 'next/image';

// Components
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

// Assets
import ImageExample from '@/public/images/home/modern-luxe.png';

export default async function Order() {
  return (
    <>
      <h1 className="text-xl font-semibold">Order: 000001</h1>
      <div className="mt-16 rounded border border-gray-200 p-4">
        <div className="flex gap-2">
          <p className="text-gray-500">Estimate delivery: </p>
          <p> 1 — 3 Dec, 2024</p>
        </div>
        <div className="mt-4 flex items-center xl:mt-8">
          <Tag iconLeft={<Icon name="package" className="size-3" />}>
            Packing
          </Tag>
          <div className="h-px w-4 bg-gray-900"></div>
          <Tag
            colorScheme="gray"
            iconLeft={<Icon name="package" className="size-3 text-gray-900" />}
          >
            Delivering
          </Tag>
          <div className="h-px w-4 bg-gray-900"></div>
          <Tag
            colorScheme="gray"
            iconLeft={<Icon name="package" className="size-3 text-gray-900" />}
          >
            Packing
          </Tag>
          <Button variant="outline" className="ml-auto hidden xl:block">
            Check status
          </Button>
        </div>
        {/* TODO: Pogledaj botun ispod na širini prozora `1040px`, bude slomljen. FIXED */}
        <Button variant="outline" className="ml-auto mt-4 xl:hidden">
          Check status
        </Button>
      </div>

      <div className="mt-6 flex items-center justify-between rounded border border-gray-200 p-4">
        <Icon name="calendar" className="size-4" />
        <p className="ml-4 text-gray-200">Order date </p>
        <p className="ml-auto">1 Dec, 2024</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 rounded border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <Icon name="map" className="size-4" />
            <p className="text-gray-500">Delivery address</p>
          </div>
          <p className="mt-8">Jovana Jeremic</p>
          <p>Jovana Jerimic Duvanjska 3, 10000 Zagreb, Croatia</p>
          <p>+385 226 2266</p>
        </div>
        <div className="flex-1 rounded border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <Icon name="receipt" className="size-4" />
            <p className="text-gray-500">Billing address</p>
          </div>
          <p className="mt-8">Jovana Jeremic</p>
          <p>Jovana Jerimic Duvanjska 3, 10000 Zagreb, Croatia</p>
          <p>+385 226 2266</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col rounded border border-gray-200 p-4">
        {[...Array(8)].map((_, i: number) => (
          <>
            {i !== 0 && (
              <hr className="my-6 h-px w-full border-0 bg-gray-200" />
            )}
            <OrderedProduct
              key={i}
              orderImage={
                <div className="h-52 w-36">
                  <Image
                    src={ImageExample}
                    alt="Image Example"
                    className="h-full w-full object-cover"
                  />
                </div>
              }
              title="Paloma Heaven"
              material="Linen"
              color="Gray"
              quantity={1}
              price={30}
            />
            {/* TODO: A šta ćemo ako dodam 8. element? FIXED*/}
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
            <p className="ml-40"> €120</p>
          </div>
          <div className="mt-2 flex">
            <p className="text-gray-500">Shipping</p>
            <p className="ml-40"> €15</p>
          </div>
          <div className="mt-6 flex text-lg">
            <p>Total</p>
            <p className="ml-40">€135</p>
          </div>
          <p className="text-sm text-gray-500">Including 11.25 tax </p>
        </div>
      </div>
    </>
  );
}

const OrderedProduct: React.FC<{
  orderImage: React.ReactNode;
  title: string;
  material: string;
  color: string;
  quantity: number;
  price: number;
}> = ({ orderImage, title, material, color, quantity, price }) => (
  <div className="flex">
    {orderImage}
    <div className="ml-8 flex flex-1 flex-col">
      <h4 className="text-lg">{title}</h4>

      <p className="text-gray-500">
        Material: <span className="text-gray-900"> {material}</span>
      </p>
      <p className="text-gray-500">
        Color: <span className="text-gray-900"> {color}</span>
      </p>
      <p className="mt-auto text-gray-500">
        Quantity: <span className="text-gray-900">{quantity}</span>
      </p>
    </div>
    <p className="mt-auto lg:text-lg">€{price}</p>
  </div>
);
