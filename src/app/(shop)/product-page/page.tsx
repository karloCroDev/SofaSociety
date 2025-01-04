// Etxernal packages
import Image from 'next/image';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { SelectMaterial } from '@/components/shop/product-page/SelectMaterial';
import { AddToCart } from '@/components/shop/product-page/AddToCart';
import { ImageSlider } from '@/components/shop/product-page/ImageSlider';

export default function ProductPage() {
  return (
    <Layout className="mt-22 lg:mt-32">
      <LayoutRow className="flex-col gap-8 lg:flex-row lg:gap-0">
        <LayoutColumn xs={12} lg={7} className="lg:pr-8">
          <ImageSlider />
        </LayoutColumn>
        <LayoutColumn xs={12} lg={5} className="flex flex-col lg:pl-8">
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
