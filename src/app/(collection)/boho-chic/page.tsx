// External packages
import Image from 'next/image';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Filters } from '@/components/filters/Filters';
import { ProductCard } from '@/components/ui/ProductCard';

// Images
import ImageHero from '@/public/images/inspiration/dobule-sofa.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

export default function bohoChic() {
  return (
    <>
      <div className="mt-22 lg:mt-0">
        <Image
          src={ImageHero}
          alt="About image that represents SofaSociety.Co"
          className="object-cover xl:h-[75vh]"
        />
      </div>
      <Layout>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={5}>
            <h2 className="text-2xl font-medium">
              Boho Chic: Relaxed, eclectic style with a touch of free-spirited
              charm
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-6 lg:mt-16">
            <p>
              Infused with playful textures and vibrant patterns, this
              collection embodies relaxed, eclectic vibes. Soft fabrics and
              creative designs add warmth and personality to any room.
            </p>
            <p className="mt-6">It’s comfort with a bold, carefree spirit.</p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-2xl font-medium lg:mt-36">Boho Chic</h2>
        <Filters />
        <LayoutRow className="-mr-4 mt-8 lg:-mr-12">
          {[...Array(9)].map((_, index) => (
            <LayoutColumn
              xs={6}
              xl={4}
              className="mb-10 pr-4 lg:mb-16 lg:pr-12"
              key={index}
            >
              <ProductCard
                name="Astrid Curve"
                category="Scandinavian Simplicity"
                image={
                  <div className="">
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