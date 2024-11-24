// External packages
import Image from 'next/image';

// Components
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Collections } from '@/components/welcoming-pages/Collections';
import { ProductCard } from '@/components/ui/ProductCard';

// Images
import ImageHero from '@/public/images/inspiration/hero.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';
import ImageLivingRoom from '@/public/images/about/living-room-sofa.png';
import ImageNordicHeaven from '@/public/images/inspiration/nordic-heaven.png';
import ImageBelimeHeaven from '@/public/images/inspiration/belime-heaven.png';
import ImageDoubleSofa from '@/public/images/inspiration/dobule-sofa.png';
import ImageOsloDrift from '@/public/images/inspiration/oslo-drift.png';

export default function Inspiration() {
  return (
    <>
      <Header />
      <div className="mt-22 lg:mt-0">
        <Image
          src={ImageHero}
          alt="About image that represents SofaSociety.Co"
          className="object-cover xl:h-[75vh]"
        />
      </div>
      <Layout>
        <LayoutRow className="mt-8 flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={7}>
            <h2 className="text-2xl font-medium">
              The Astrid Curve sofa is a masterpiece of minimalism and luxury.
            </h2>
            <p className="mt-6 lg:mt-16">
              Our design philosophy revolves around creating pieces that are
              both beautiful and practical. Inspired by Scandinavian simplicity,
              modern luxury, and timeless classics.
            </p>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={4}>
            <ProductCard
              name="Astrid Curve"
              category="Scandinavian Simplicity"
              image={
                <div className="mt-16 lg:mt-0">
                  <Image src={ImageAstridCurve} alt="Astrid curve image" />
                </div>
              }
              price="1800€"
            />
          </LayoutColumn>
        </LayoutRow>
        <div className="mt-24 lg:mt-36">
          <Image src={ImageLivingRoom} alt="Representation of living room" />
        </div>
        <LayoutRow className="mt-8 flex flex-col md:mt-16 lg:flex-row lg:justify-between xl:mt-24">
          <LayoutColumn lg={6} xs={12}>
            <h2 className="text-2xl font-medium">
              Haven Sofas have minimalistic designs, neutral colors, and
              high-quality textures.
            </h2>
            <p className="mt-6 lg:mt-16">
              Perfect for those who seek comfort with a clean and understated
              aesthetic. This collection brings the essence of Scandinavian
              elegance to your living room.
            </p>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={4} className="flex flex-col">
            <ProductCard
              name="Noridc Heaven"
              category="Scandinavian Simplicity"
              image={
                <div className="mt-16 lg:mt-0">
                  <Image src={ImageNordicHeaven} alt="Noridic Heaven" />
                </div>
              }
              price="1800€"
            />
            <ProductCard
              name="Belime Heaven"
              category="Modern Luxe"
              image={
                <div className="mt-8 lg:mt-16">
                  <Image src={ImageBelimeHeaven} alt="Belime Heaven" />
                </div>
              }
              price="1800€"
            />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
      <div>
        <Image
          src={ImageDoubleSofa}
          alt="Arrays of sofa"
          className="mt-24 px-4 lg:mt-36 lg:px-0"
        />
      </div>

      <Layout>
        <LayoutRow className="mt-8 flex flex-col md:mt-16 lg:flex-row lg:justify-between xl:mt-24">
          <LayoutColumn xs={12} lg={6}>
            <h2 className="text-2xl font-medium">
              Oslo Drift is infused with playful textures and vibrant patterns
              with eclectic vibes.
            </h2>
            <p className="mt-6 lg:mt-16">
              Whether you're looking for bold statement pieces or subtle
              elegance, this collection elevates your home with a touch of
              glamour, sophistication, and unmatched coziness.
            </p>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={4}>
            <ProductCard
              name="Oslo Drift"
              category="Scandinavian Simplicity"
              image={
                <div className="mt-8 lg:mt-16">
                  <Image src={ImageOsloDrift} alt="Belime Heaven" />
                </div>
              }
              price="2000€"
              originalPrice="3000€"
            />
          </LayoutColumn>
        </LayoutRow>
        <Collections />
      </Layout>

      <Footer />
    </>
  );
}
