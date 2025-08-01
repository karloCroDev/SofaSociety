// External packages
import Image from 'next/image';

// External packages
import { HttpTypes } from '@medusajs/types';
import { getProductPrice } from '@/lib/util/get-product-price';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Collections } from '@/components/ui/Collections';
import { ProductCard } from '@/components/ui/ProductCard';

// Assets
import ImageHero from '@/public/images/inspiration/hero.png';
import ImageLivingRoom from '@/public/images/about/living-room-sofa.png';
import ImageDoubleSofa from '@/public/images/inspiration/dobule-sofa.png';

// Lib
import { getCollectionsList } from '@/lib/data/collections';
import { getProductsListWithSort } from '@/lib/data/products';
import { getRegion } from '@/lib/data/regions';

interface PageProps {
  params: Promise<{ location: string }>;
}
export default async function Inspiration({ params }: PageProps) {
  const { location } = await params;

  const queryParams: HttpTypes.StoreProductListParams = {
    collection_id: 'pcol_01JYMAJJCKWT5SRM3PK7DKHD49', // Only this collection is shown as example in design file
    limit: 4,
  };

  const [{ collections }, collectionProducts, region] = await Promise.all([
    getCollectionsList(0, 20, ['metadata', 'handle', 'title']),
    getProductsListWithSort({ countryCode: location, queryParams, page: 1 }),
    getRegion(location),
  ]);

  const scandinavianProducts =
    region &&
    collectionProducts.response.products.map((product) => {
      const { cheapestPrice } = getProductPrice({
        product,
      });

      return (
        <ProductCard
          name={product.title}
          category={product.collection!.title}
          image={
            <div className="relative aspect-[4/3]">
              <Image
                src={product.thumbnail!}
                className="object-cover"
                alt={product.description!}
                fill
              />
            </div>
          }
          price={cheapestPrice?.calculated_price.toString()!}
          originalPrice={
            cheapestPrice?.original_price === cheapestPrice?.calculated_price
              ? undefined
              : cheapestPrice?.original_price.toString()
          }
          href={`/product/${product.handle}`}
        />
      );
    });

  return (
    <>
      <div className="mt-22 lg:mt-0">
        <Image
          src={ImageHero}
          alt="About image that represents SofaSociety.Co"
          className="object-cover lg:h-[800px]"
        />
      </div>
      <Layout>
        <LayoutRow className="mt-8 flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={7}>
            <h2 className="text-xl font-medium lg:text-3xl">
              The Astrid Curve sofa is a masterpiece of minimalism and luxury.
            </h2>
            <p className="mt-6 lg:mt-16">
              Our design philosophy revolves around creating pieces that are
              both beautiful and practical. Inspired by Scandinavian simplicity,
              modern luxury, and timeless classics.
            </p>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={4}>
            {Array.isArray(scandinavianProducts) && scandinavianProducts[0]}
          </LayoutColumn>
        </LayoutRow>
        <div className="mt-24 lg:mt-36">
          <Image src={ImageLivingRoom} alt="Representation of living room" />
        </div>
        <LayoutRow className="mt-8 flex flex-col md:mt-16 lg:flex-row lg:justify-between xl:mt-24">
          <LayoutColumn lg={6} xs={12}>
            <h2 className="text-xl font-medium lg:text-3xl">
              Haven Sofas have minimalistic designs, neutral colors, and
              high-quality textures.
            </h2>
            <p className="mt-6 lg:mt-16">
              Perfect for those who seek comfort with a clean and understated
              aesthetic. This collection brings the essence of Scandinavian
              elegance to your living room.
            </p>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={4} className="flex flex-col">
            {Array.isArray(scandinavianProducts) && scandinavianProducts[1]}

            <div className="mt-8 lg:mt-16">
              {Array.isArray(scandinavianProducts) && scandinavianProducts[1]}
            </div>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
      <div>
        <Image
          src={ImageDoubleSofa}
          alt="Arrays of sofa"
          className="mt-24 px-4 lg:mt-36 lg:px-0"
        />
      </div>

      <Layout>
        <LayoutRow className="mt-8 flex flex-col md:mt-16 lg:flex-row lg:justify-between xl:mt-24">
          <LayoutColumn xs={12} lg={6}>
            <h2 className="text-xl font-medium lg:text-3xl">
              Oslo Drift is infused with playful textures and vibrant patterns
              with eclectic vibes.
            </h2>
            <p className="mt-6 lg:mt-16">
              Whether you're looking for bold statement pieces or subtle
              elegance, this collection elevates your home with a touch of
              glamour, sophistication, and unmatched coziness.
            </p>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={4}>
            {Array.isArray(scandinavianProducts) && scandinavianProducts[1]}
          </LayoutColumn>
        </LayoutRow>
        <div className="mt-24 lg:mt-32">
          <Collections collections={collections} />
        </div>
      </Layout>
    </>
  );
}
