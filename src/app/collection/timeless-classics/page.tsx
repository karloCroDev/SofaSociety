// External packages
import Image from 'next/image';

// Components
import { PageTemplate } from '@/components/collection/PageTemplate';
import { LayoutColumn } from '@/components/ui/Layout';
import { ProductCard } from '@/components/ui/ProductCard';

// Assets
import ImageHero from '@/public/images/inspiration/hero.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

export default function TimelessClassics() {
  return (
    <PageTemplate
      heroImage={
        <div className="mt-22 lg:mt-0">
          <Image
            src={ImageHero}
            alt="Timeless classics hero"
            className="object-cover lg:h-[800px]"
          />
        </div>
      }
      title="Timeless Classics: Enduring style, crafted for comfort and lasting beauty"
      descirpiton="Designed for those who appreciate enduring style, this collection features elegant shapes and rich textures. These sofas combine traditional craftsmanship with modern comfort."
      subDesciption="Perfect for creating a warm, inviting atmosphere that never goes out of style."
      section="Timeless Classics"
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
