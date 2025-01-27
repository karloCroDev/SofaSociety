// External packaghes
import Image from 'next/image';

// Components
import { Layout, LayoutColumn } from '@/components/ui/Layout';
import { Icon } from '@/components/ui/Icon';

// Images
import ImageExample from '@/public/images/home/armed-chair.png';
import { AddToCart } from '@/components/shop/AddToCart';

export default function Cart() {
  return (
    <Layout className="mt-28 lg:mt-32">
      <LayoutColumn xs={12} lg={9} className="lg:pr-6">
        <h1 className="mb-8 text-xl font-semibold lg:mb-12 lg:text-2xl 2xl:text-3xl">
          Shopping cart
        </h1>
        {[...Array(5)].map((_, i) => (
          <Products
            name="Paloma Heaven"
            color="Linen/Light gray"
            image={
              <div className="h-full w-28">
                <Image
                  src={ImageExample}
                  alt="XXX product"
                  className="h-full w-full object-cover"
                />
              </div>
            }
            price="€1500"
            originalPrice="€2000"
            key={i}
          />
        ))}
      </LayoutColumn>
      <LayoutColumn xs={12} lg={3} className="lg:pl-6"></LayoutColumn>
    </Layout>
  );
}

const Products: React.FC<{
  image: React.ReactNode;
  name: string;
  color: string;
  price: string;
  originalPrice?: string;
}> = ({ image, name, color, price, originalPrice }) => {
  return (
    <div className="flex h-52 w-full gap-5 border-t border-gray-200 py-8">
      {image}
      <div className="flex flex-col">
        <h4 className="text-md lg:text-lg">{name}</h4>
        <p className="text-xs text-gray-500 lg:text-sm">{color}</p>

        <div className="flex items-center gap-2 py-4 lg:hidden">
          {originalPrice ? (
            <div className="flex flex-col">
              <p className="text-sm font-bold text-red-700">{price}</p>

              <p className="block text-sm text-gray-500 line-through">
                {originalPrice}
              </p>
            </div>
          ) : (
            <p className="font-bold">{price}</p>
          )}
        </div>

        <AddToCart className="mt-auto !w-fit" />
      </div>
      <div className="ml-auto flex flex-col">
        {originalPrice ? (
          <>
            <p className="hidden text-md font-semibold text-red-700 lg:block">
              {price}
            </p>
            <p className="hidden text-end text-gray-500 line-through lg:block">
              {originalPrice}
            </p>
          </>
        ) : (
          <p className="text-grayscale-400 hidden text-md lg:block">{price}</p>
        )}
        <Icon className="mx-auto mb-3 mt-auto cursor-pointer" name="bin" />
      </div>
    </div>
  );
};
