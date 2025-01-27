// External packages
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SelectMaterial } from '@/components/shop/product/SelectMaterial';
import { ImageSlider } from '@/components/shop/product/ImageSlider';
import { ProductCard } from '@/components/ui/ProductCard';

// Images
import ImageInspiredInterior from '@/public/images/product/inspired-interior.png';
import ImageInspiredInteriorWide from '@/public/images/product/inpired-intrerior-wide.png';
import ImageSofaHeaven from '@/public/images/product/sofa-heaven.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';
import ImagePalomaHeaven from '@/public/images/product/paloma-heaven.png';
import ImagePalomaHeavenDetails from '@/public/images/product/paloma-heaven-details.png';

export default function ProductPage() {
  return (
    <>
      {/* Mobile version outside of layout */}
      <div className="relative mt-22 lg:hidden">
        <LayoutRow className="max-h-[500px] snap-x snap-mandatory flex-nowrap overflow-x-scroll scroll-smooth lg:max-h-none lg:flex-row">
          <LayoutColumn
            xs={12}
            lg={8}
            className="flex-shrink-0 snap-start lg:pr-2"
          >
            <Image
              className="h-full object-cover"
              src={ImagePalomaHeaven}
              alt="Representaion of your wanted product"
            />
          </LayoutColumn>
          <LayoutColumn
            xs={12}
            lg={8}
            className="flex-shrink-0 snap-start lg:pl-2"
          >
            <Image
              className="h-full object-cover"
              src={ImagePalomaHeavenDetails}
              alt="Detailed representaion of your wanted product"
            />
          </LayoutColumn>
        </LayoutRow>

        <div className="absolute bottom-4 left-1/2 mt-6 flex -translate-x-1/2 transform justify-center text-md lg:hidden">
          <p className="mr-4 underline underline-offset-4">1</p>
          <p>2</p>
        </div>
      </div>

      <Layout className="mt-8 lg:mt-32">
        <LayoutRow>
          <LayoutColumn xs={12} lg={7} className="hidden lg:block lg:pr-8">
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

            <p className="mt-4 text-gray-500">Estimate delivery 2-3 days</p>
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
            <h2 className="mt-8 text-lg lg:mt-20 lg:text-3xl lg:font-medium">
              The Paloma Haven sofa is a masterpiece of minimalism and luxury.
            </h2>
            <Link href="/about" className="mt-8 underline underline-offset-2">
              See more out of ‘Modern Luxe’ collection
            </Link>
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
