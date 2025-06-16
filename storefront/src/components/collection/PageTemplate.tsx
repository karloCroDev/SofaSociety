// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Slider } from '@/components/ui/filters/Slider';
import { Color } from '@/components/ui/filters/Color';
import { Materials } from '@/components/ui/filters/Materials';
import { Collection } from '@/components/ui/filters/Collection';
import { PopoverOption } from '@/components/ui/filters/PopoverOption';
import { Sort } from '@/components/ui/filters/Sort';
import { DrawerFilter } from '@/components/ui/filters/DarwerFilter';
import { DrawerSort } from '@/components/ui/filters/DrawerSort';

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
          <h2 className="text-xl font-medium lg:text-3xl">{title}</h2>
        </LayoutColumn>
        <LayoutColumn xs={12} lg={6} className="mt-6 lg:mt-16">
          <p>{descirpiton}</p>
          <p className="mt-6">{subDesciption}</p>
        </LayoutColumn>
      </LayoutRow>
      <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">
        {section}
      </h2>
      {/* TODO: Ja bi filtere ispod ubacija direktno u ovu komponentu. FIXED*/}
      <div className="mt-6 flex justify-between lg:mt-8">
        <div className="hidden gap-4 lg:flex">
          <PopoverOption title="Price">
            <Slider />
          </PopoverOption>
          <PopoverOption title="Color">
            <Color />
          </PopoverOption>
          <PopoverOption title="Materials">
            <Materials />
          </PopoverOption>
          <PopoverOption title="Collection">
            <Collection />
          </PopoverOption>
        </div>
        <div className="hidden lg:block">
          <PopoverOption
            title="Sort by"
            popoverProps={{
              placement: 'bottom right',
            }}
          >
            <Sort />
          </PopoverOption>
        </div>

        <DrawerFilter />
        <DrawerSort />
      </div>
      <LayoutRow className="-mr-4 mt-8 lg:-mr-12">{products}</LayoutRow>
    </Layout>
  </>
);
