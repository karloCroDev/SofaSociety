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

// Assets
import ImageHero from '@/public/images/inspiration/modern-luxe.png';
import ImageAstridCurve from '@/public/images/inspiration/astrid-curve.png';

// Lib
import { getCollectionByHandle } from '@/lib/data/collections';
import { collectionMetadataCustomFieldsSchema } from '@/lib/util/collections';

export default async function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;

  const collection = await getCollectionByHandle(handle, [
    'metadata',
    'title',
    'products',
  ]);
  const collectionData = collectionMetadataCustomFieldsSchema.safeParse(
    collection.metadata ?? {}
  );

  console.log(collection);
  console.log('Collection Data:', collectionData);
  return (
    <>
      <div className="relative mt-22 min-h-[200px] lg:mt-0 lg:h-[800px]">
        {collectionData.data?.image?.url && (
          <Image
            src={collectionData.data.image.url}
            alt="Main image that represents collection"
            className="object-cover"
            fill
          />
        )}
      </div>
      <Layout>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={5}>
            <h2 className="text-xl font-medium lg:text-3xl">
              {collectionData.data?.collection_page_heading}
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-6 lg:mt-16">
            <p>{collectionData.data?.collection_page_content}</p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">
          {collection.title}
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
        {/* <LayoutRow className="-mr-4 mt-8 lg:-mr-12">{}</LayoutRow> */}
      </Layout>
    </>
    // <PageTemplate
    //   heroImage={
    //     <div className="mt-22 lg:mt-0">
    //       <Image
    //         src={ImageHero}
    //         alt="Modern Luxe hero"
    //         className="w-full object-cover lg:h-[800px]"
    //       />
    //     </div>
    //   }
    //   title="Modern Luxe: Where modern design meets luxurious living"
    //   descirpiton="Sophisticated and sleek, these sofas blend modern design with luxurious comfort. Bold lines and premium materials create the ultimate statement pieces for any contemporary home. "
    //   subDesciption="Elevate your space with timeless beauty."
    //   section="Modern Luxe"
    //   products={[...Array(9)].map((_, index) => (
    //     <LayoutColumn
    //       xs={6}
    //       xl={4}
    //       className="mb-10 pr-4 lg:mb-16 lg:pr-12"
    //       key={index}
    //     >
    //       <ProductCard
    //         name="Astrid Curve"
    //         category="Scandinavian Simplicity"
    //         image={
    //           <div className="">
    //             <Image src={ImageAstridCurve} alt="Astrid curve image" />
    //           </div>
    //         }
    //         price="1800€"
    //         href="/product"
    //       />
    //     </LayoutColumn>
    //   ))}
    // />
  );
}
