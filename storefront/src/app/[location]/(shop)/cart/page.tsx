// External packaghes
import Image from 'next/image';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Icon } from '@/components/ui/Icon';
import { getCustomer } from '@/lib/data/customer';

// Assets
import ImageExample from '@/public/images/home/armed-chair.png';
import { AddToCart } from '@/components/shop/AddToCart';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { redirect } from 'next/navigation';

export default function Cart() {
  const customer = getCustomer();

  if (!customer) redirect('/login');
  return (
    <Layout className="mt-28 lg:mt-32">
      <LayoutRow>
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
        {/* TODO: Mislim da bi ova kolumna ispod trebala biti fiksna, dok bi se content s lijeve strane trebao moći "skrolati". FIXED*/}
        <LayoutColumn xs={12} lg={3} className="lg:pl-6">
          <div className="lg:sticky lg:top-40">
            <hr className="mt-6 h-px border-0 bg-gray-200 lg:hidden" />
            <div className="mt-8 flex flex-row justify-between lg:mt-5 2xl:mt-8">
              <p>Subtotal:</p>
              <p className="text-gray-500">€225</p>
            </div>
            <div className="mt-4 flex flex-row justify-between">
              <p>Shipping:</p>
              <p className="text-gray-500">Free</p>
            </div>
            <hr className="mt-6 h-px border-0 bg-gray-200" />
            <div className="mt-6 flex flex-row justify-between text-lg font-bold">
              <h4>Total:</h4>
              <p>€225</p>
            </div>
            <div className="mt-10 flex flex-row justify-between gap-4">
              <Input label="Discount code" />
              <Button isVisuallyDisabled>Apply</Button>
            </div>
            {/* TODO: Ovaj botun mi pari veći nego bi triba bit i slomljen mi je na širini prozora od `1040px`. FIXED */}
            <LinkAsButton href="/checkout" className="mt-6 w-full">
              Proceed to checkout
            </LinkAsButton>
          </div>
        </LayoutColumn>
      </LayoutRow>
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
          <p className="hidden text-md lg:block">{price}</p>
        )}
        {/* TODO: Mislim da bi ovu ikonu trebalo poravnati desno. FIXED*/}
        <Icon className="mb-3 ml-auto mt-auto cursor-pointer" name="bin" />
      </div>
    </div>
  );
};
