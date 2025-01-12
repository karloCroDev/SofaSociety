// External packages
import Image from 'next/image';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SelectMaterial } from '@/components/shop/product/SelectMaterial';
import { AddToCart } from '@/components/shop/product/AddToCart';
import { ImageSlider } from '@/components/shop/product/ImageSlider';
import { ProductCard } from '@/components/ui/ProductCard';

// Images
import ImageInspiredInterior from '@/public/images/product/inspired-interior.png';
import ImageInspiredInteriorWide from '@/public/images/product/inpired-intrerior-wide.png';
import ImageSofaHeaven from '@/public/images/product/sofa-heaven.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

export default function ProductPage() {
  return (
    <>
      <Layout className="mt-22 lg:mt-32">
        <LayoutRow className="flex-col gap-8 lg:flex-row lg:gap-0">
          <LayoutColumn xs={12} lg={7} className="lg:pr-8">
            <ImageSlider />
          </LayoutColumn>
          <LayoutColumn xs={12} lg={5} className="flex flex-col lg:pl-8">
            <p className="text-gray-500">Modern Luxe</p>
            <h1 className="text-xl lg:text-2xl">Paloma Heaven</h1>
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
        <h2 className="mt-24 text-xl font-medium lg:mt-20 lg:text-3xl">
          Collection Inspired Interior
        </h2>
        <Image
          src={ImageInspiredInterior}
          alt="Inspired interior"
          className="mt-8"
        />
      </Layout>
      <Image
        src={ImageInspiredInteriorWide}
        alt="Inspired interior"
        className="mt-8 lg:mt-20"
      />
      <Layout>
        <LayoutRow className="mt-8 lg:mt-20">
          <LayoutColumn xs={8} lg={5}>
            <Image
              src={ImageSofaHeaven}
              alt="Inspired interior"
              className="lg:pr-12"
            />
          </LayoutColumn>
          <LayoutColumn xs={12} lg={7} className="lg:pl-12">
            <h2 className="mt-8 lg:mt-20 lg:lg:text-3xl lg:font-medium">
              The Paloma Haven sofa is a masterpiece of minimalism and luxury.
            </h2>
            <p className="mt-8 underline underline-offset-2">
              See more out of ‘Modern Luxe’ collection
            </p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">
          Related products
        </h2>
        <LayoutRow className="-mr-4 mt-8 flex snap-x snap-mandatory flex-nowrap overflow-x-scroll lg:-mr-12">
          {[...Array(8)].map((_, index) => (
            <LayoutColumn
              xs={6}
              xl={4}
              className="mb-10 flex-shrink-0 snap-start pr-4 lg:mb-16 lg:pr-12"
              key={index}
            >
              <ProductCard
                name="Astrid Curve"
                category="Scandinavian Simplicity"
                image={
                  <div>
                    <Image src={ImageAstridCurve} alt="Astrid curve image" />
                  </div>
                }
                price="1800€"
              />
            </LayoutColumn>
          ))}
        </LayoutRow>
      </Layout>
    </>
  );
}
