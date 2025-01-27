// External packages
import Image from 'next/image';

// Components
import { PageTemplate } from '@/components/collection/PageTemplate';
import { LayoutColumn } from '@/components/ui/Layout';
import { ProductCard } from '@/components/ui/ProductCard';

// Assets
import ImageHero from '@/public/images/inspiration/modern-luxe.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

export default function ModernLuxe() {
  return (
    <PageTemplate
      heroImage={
        <div className="mt-22 lg:mt-0">
          <Image
            src={ImageHero}
            alt="Modern Luxe hero"
            className="w-full object-cover lg:h-[800px]"
          />
        </div>
      }
      title="Modern Luxe: Where modern design meets luxurious living"
      descirpiton="Sophisticated and sleek, these sofas blend modern design with luxurious comfort. Bold lines and premium materials create the ultimate statement pieces for any contemporary home. "
      subDesciption="Elevate your space with timeless beauty."
      section="Modern Luxe"
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
