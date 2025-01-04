// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Filters } from '@/components/ui/filters/Filters';

export const PageTemplate: React.FC<{
  heroImage: React.ReactNode;
  title: string;
  descirpiton: string;
  subDesciption: string;
  section: string;
  products: React.ReactNode;
}> = ({ heroImage, title, descirpiton, subDesciption, section, products }) => (
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
      <h2 className="mt-24 text-2xl font-medium lg:mt-36">{section}</h2>
      <Filters />
      <LayoutRow className="-mr-4 mt-8 lg:-mr-12">{products}</LayoutRow>
    </Layout>
  </>
);
