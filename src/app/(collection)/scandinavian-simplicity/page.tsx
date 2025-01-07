// External packages
import Image from 'next/image';

// Components
import { PageTemplate } from '@/components/collection/PageTemplate';
import { LayoutColumn } from '@/components/ui/Layout';
import { ProductCard } from '@/components/ui/ProductCard';

// Images
import ImageHero from '@/public/images/home/hero.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

export default function ScandinavianSimplicity() {
  return (
    <PageTemplate
      heroImage={
        <div className="mt-22 lg:mt-0">
          <Image
            src={ImageHero}
            alt="Scandinavian Simplicity hero"
            className="object-cover lg:h-[800px]"
          />
        </div>
      }
      title="Modern Luxe: Where modern design meets luxurious living"
      descirpiton="Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic. "
      subDesciption="This collection brings the essence of Scandinavian elegance to your living room."
      section="Scandinavian Simplicity"
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
