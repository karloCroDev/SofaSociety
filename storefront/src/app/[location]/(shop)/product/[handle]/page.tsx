// External packages
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SelectMaterial } from '@/components/shop/product/SelectMaterial';
import { ImageSlider } from '@/components/shop/product/ImageSlider';
import {
  ProductsMapping,
  ProductsSkeletonMapping,
} from '@/components/ui/ProductsGrid';
import { type SortOptions } from '@/components/ui/ProductsGrid';

// Lib
import {
  getProductByHandle,
  getProductFashionDataByHandle,
} from '@/lib/data/products';
import { getRegion } from '@/lib/data/regions';
import { collectionMetadataCustomFieldsSchema } from '@/lib/util/collections';

// Assets
import ImageInspiredInterior from '@/public/images/product/inspired-interior.png';
import ImageInspiredInteriorWide from '@/public/images/product/inpired-intrerior-wide.png';
import ImageSofaHeaven from '@/public/images/product/sofa-heaven.png';
import {
  getPricesForVariant,
  getProductPrice,
} from '@/lib/util/get-product-price';

interface PageProps {
  params: Promise<{ location: string; handle: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { location, handle } = await params;
  const region = await getRegion(location);

  if (!region) redirect('/');

  const productData = await getProductByHandle(handle, region.id);
  const fashionDetails = await getProductFashionDataByHandle(handle);
  const price = getProductPrice({
    product: productData,
  });

  const collectioonData = collectionMetadataCustomFieldsSchema.safeParse(
    productData.collection?.metadata ?? {}
  );

  return (
    <>
      {/* Mobile version outside of layout */}
      <div className="relative mt-22 lg:hidden">
        <LayoutRow className="max-h-[500px] snap-x snap-mandatory flex-nowrap overflow-x-scroll scroll-smooth lg:max-h-none lg:flex-row">
          <LayoutColumn
            xs={12}
            lg={8}
            className="relative flex-shrink-0 snap-start lg:pr-2"
          >
            <Image
              className="h-full object-cover"
              src={productData.images?.[0]?.url || ''}
              alt="Representaion of your wanted product "
              fill
            />
          </LayoutColumn>
          <LayoutColumn
            xs={12}
            lg={8}
            className="relative aspect-[3/4] flex-shrink-0 snap-start lg:pl-2"
          >
            <Image
              className="h-full object-cover"
              src={productData.images?.[1]?.url || ''}
              alt="Detailed representaion of your wanted product"
              fill
            />
          </LayoutColumn>
        </LayoutRow>
        {/* Karlo:handle numbers  */}
        <div className="absolute bottom-4 left-1/2 mt-6 flex -translate-x-1/2 transform justify-center text-md lg:hidden">
          <p className="mr-4 underline underline-offset-4">1</p>
          <p>2</p>
        </div>
      </div>

      <Layout className="mt-8 lg:mt-32">
        <LayoutRow>
          <LayoutColumn xs={12} lg={7} className="hidden lg:block lg:pr-8">
            <ImageSlider imageData={productData.images!} />
          </LayoutColumn>
          <LayoutColumn xs={12} lg={5} className="flex flex-col lg:pl-8">
            <p className="text-gray-500">{productData.collection?.title}</p>
            <h1 className="text-xl lg:text-2xl">{productData.title}</h1>
            <p className="mt-2 text-lg">
              {/* Karlo: Handle numbers */}
              {price.variantPrice?.calculated_price}
            </p>
            <p className="mt-8">{productData.description}</p>
            <SelectMaterial customatization={fashionDetails.materials} />

            <p className="mt-4 text-gray-500">Estimate delivery 2-3 days</p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-xl font-medium lg:mt-20 lg:text-3xl">
          {collectioonData.data?.product_page_heading}
        </h2>
        <div className="relative mt-8 w-full lg:h-[500px] 2xl:h-[800px]">
          <Image
            src={collectioonData.data?.collection_page_image?.url || ''}
            alt="Inspired interior"
            className="object-cover"
            fill
          />
        </div>
      </Layout>
      <div className="relative mt-8 lg:mt-20 lg:h-[800px] 2xl:h-[1200px]">
        <Image
          src={collectioonData.data?.product_page_cta_image?.url || ''}
          alt="Inspired interior"
          className="object-cover"
          fill
        />
      </div>
      <Layout>
        <LayoutRow className="mt-8 lg:mt-20">
          <LayoutColumn xs={8} lg={5} className="relative h-96 lg:pr-12">
            <Image
              src={collectioonData.data?.product_page_image?.url || ''}
              alt="Inspired interior"
              className="object-cover"
              fill
            />
          </LayoutColumn>
          <LayoutColumn xs={12} lg={7} className="lg:pl-12">
            <h2 className="mt-8 text-lg lg:mt-20 lg:text-3xl lg:font-medium">
              {collectioonData.data?.collection_page_heading}
            </h2>
            <Link href="/about" className="mt-8 underline underline-offset-2">
              {collectioonData.data?.product_page_cta_link}
            </Link>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-xl font-medium lg:mt-36 lg:text-3xl">
          Related products
        </h2>

        <Suspense fallback={<ProductsSkeletonMapping amount={3} />}>
          <ProductsMapping
            location={location}
            sortBy="created_at"
            page={1}
            collectionId={productData.collection_id!}
            categoryId={undefined}
            productsIds={productData.collection?.products?.map(
              (product) => product.id
            )}
            typeId={undefined}
            direction="horizontal"
          />
        </Suspense>
      </Layout>
    </>
  );
}
