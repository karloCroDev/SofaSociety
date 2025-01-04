// External packages
import Image from 'next/image';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { ProductCard } from '@/components/ui/ProductCard';
import { PageTemplate } from '@/components/collection/PageTemplate';

// Images
import ImageHero from '@/public/images/inspiration/dobule-sofa.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

export default function BohoChic() {
  return (
    <PageTemplate
      heroImage={
        <div className="mt-22 lg:mt-0">
          <Image
            src={ImageHero}
            alt="Boho Chic hero"
            className="object-cover xl:max-h-[800px]"
          />
        </div>
      }
      title="Boho Chic: Relaxed, eclectic style with a touch of free-spirited charm"
      descirpiton="Infused with playful textures and vibrant patterns, this
              collection embodies relaxed, eclectic vibes. Soft fabrics and
              creative designs add warmth and personality to any room."
      subDesciption="It’s comfort with a bold, carefree spirit."
      section="Boho Chic"
      products={[...Array(9)].map((_, index) => (
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
    />
  );
}
