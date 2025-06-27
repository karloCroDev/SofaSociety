// External packages
import Image from 'next/image';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { ProductCard, ProductCardSkeleton } from '@/components/ui/ProductCard';

// Assets
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

export const ProductsMapping: React.FC<{}> = () => {
  return [...Array(8)].map((_, index) => (
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
        href="/product"
      />
    </LayoutColumn>
  ));
};

export const ProductsSkeletonMapping = () => {
  return [...Array(8)].map((_, index) => (
    <LayoutColumn
      xs={6}
      xl={4}
      className="mb-10 flex-shrink-0 snap-start pr-4 lg:mb-16 lg:pr-12"
      key={index}
    >
      <ProductCardSkeleton />
    </LayoutColumn>
  ));
};
