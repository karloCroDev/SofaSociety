// External packages
import Image from 'next/image';

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

// Lib
import {
  getCollectionByHandle,
  getCollectionsWithProducts,
  retrieveCollection,
} from '@/lib/collection';
import { ProductCard } from '@/components/ui/ProductCard';

export default async function CollectionPage({
  params,
}: {
  params: { pageId: string };
}) {
  const { pageId } = params;
  const { products, title } = await retrieveCollection(pageId);

  return (
    <>
      {/* <div className="mt-22 lg:mt-0">{}</div> */}
      <Layout>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={5}>
            <h2 className="text-xl font-medium lg:text-3xl">{title}</h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-6 lg:mt-16">
            {/* <p>{descirpiton}</p> */}
            {/* <p className="mt-6">{subDesciption}</p> */}
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">
          {/* {section} */}
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
        <LayoutRow className="-mr-4 mt-8 lg:-mr-12">
          {products &&
            products.map((product) => (
              <LayoutColumn
                xs={6}
                xl={4}
                className="mb-10 pr-4 lg:mb-16 lg:pr-12"
                key={product.id}
              >
                <ProductCard
                  name={product.handle}
                  category={product.handle}
                  image={
                    <div className="">
                      <Image
                        src={product.thumbnail || ''}
                        alt="Astrid curve image"
                        width={300}
                        height={300}
                      />
                    </div>
                  }
                  price="1800€"
                  href="/product"
                />
              </LayoutColumn>
            ))}
        </LayoutRow>
      </Layout>
    </>
  );
}
