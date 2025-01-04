// Etxernal packages
import Image from 'next/image';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { SelectMaterial } from '@/components/shop/product-page/SelectMaterial';
import { AddToCart } from '@/components/shop/product-page/AddToCart';

// Images
import ImagePalomaHeaven from '@/public/images/shop/paloma-heaven.png';
import ImagePalomaHeavenDetails from '@/public/images/shop/paloma-heaven-details.png';

export default function ProductPage() {
  return (
    <Layout className="mt-32">
      <LayoutRow>
        <LayoutColumn xs={12} lg={7} className="pr-8">
          <LayoutRow className="relative flex-nowrap overflow-x-scroll scroll-smooth lg:flex-row">
            <LayoutColumn lg={8} className="flex-shrink-0 lg:pr-2">
              <Image
                src={ImagePalomaHeaven}
                alt="Representaion of your wanted product"
              />
            </LayoutColumn>
            <LayoutColumn lg={8} className="flex-shrink-0 lg:pl-2">
              <Image
                src={ImagePalomaHeavenDetails}
                alt="Detailed representaion of your wanted product"
              />
            </LayoutColumn>
            <div className="absolute left-4 top-1/2 flex w-[calc(100%-32px)] justify-between">
              <ArrowButton variation="outline" />
              <ArrowButton direction="right" />
            </div>
          </LayoutRow>
          <div className="mt-6 flex justify-center text-md">
            <p className="mr-4 underline underline-offset-4">1</p>
            <p>2</p>
          </div>
        </LayoutColumn>
        <LayoutColumn xs={12} lg={5} className="flex flex-col pl-8">
          <p className="text-gray-500">Modern Luxe</p>
          <h1 className="text-2xl">Paloma Heaven</h1>
          <p className="mt-2 text-lg">€12000</p>
          <p className="mt-8">
            Minimalistic designs, neutral colors, and high-quality textures.
            Perfect for those who seek comfort with a clean and understated
            aesthetic. This collection brings the essence of Scandinavian
            elegance to your living room.
          </p>
          <SelectMaterial />
          <AddToCart />
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
