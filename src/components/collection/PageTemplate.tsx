// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Filters } from '@/components/filters/Filters';
import {
  type ProductCardTypes,
  ProductCard,
} from '@/components/ui/ProductCard';

export const PageTemplate: React.FC<
  ProductCardTypes & {
    heroImage: React.ReactNode;
    title: string;
    descirpiton: string;
    subDesciption: string;
  }
> = ({
  heroImage,
  title,
  descirpiton,
  subDesciption,
  name,
  category,
  originalPrice,
  price,
  image,
}) => (
  <>
    <div className="mt-22 lg:mt-0">{heroImage}</div>
    <Layout>
      <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
        <LayoutColumn xs={12} lg={5}>
          <h2 className="text-2xl font-medium">{title}</h2>
        </LayoutColumn>
        <LayoutColumn xs={12} lg={6} className="mt-6 lg:mt-16">
          <p>{descirpiton}</p>
          <p className="mt-6">{subDesciption}</p>
        </LayoutColumn>
      </LayoutRow>
      <h2 className="mt-24 text-2xl font-medium lg:mt-36">Modern Luxe</h2>
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
              name={name}
              category={category}
              image={image}
              originalPrice={originalPrice}
              price={price}
            />
          </LayoutColumn>
        ))}
      </LayoutRow>
    </Layout>
  </>
);
