// External packages
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import {
  ProductsMapping,
  ProductsSkeletonMapping,
} from '@/components/ui/ProductsGrid';
import { ProductCarousel } from '@/components/shop/product/ProductCarousel';
import { ProductOptions } from '@/components/shop/product/ProductOptions';

// Lib
import {
  getProductByHandle,
  getProductFashionDataByHandle,
} from '@/lib/data/products';
import { getRegion } from '@/lib/data/regions';
import { collectionMetadataCustomFieldsSchema } from '@/lib/util/collections';
import { getProductPrice } from '@/lib/util/money';

interface PageProps {
  params: Promise<{ location: string; handle: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { location, handle } = await params;
  const region = await getRegion(location);

  if (!region) redirect('/');

  const productData = await getProductByHandle({
    handle,
    regionId: region.id,
  });
  const fashionDetails = await getProductFashionDataByHandle(handle);
  const price = getProductPrice({
    product: productData,
  });

  const collectionData = collectionMetadataCustomFieldsSchema.safeParse(
    productData.collection?.metadata ?? {}
  );

  if (!collectionData.success) redirect('/');

  return (
    <>
      <ProductCarousel isMobile imageData={productData.images!} />
      <Layout className="mt-8 lg:mt-32">
        <LayoutRow>
          <LayoutColumn xs={12} lg={7} className="hidden lg:block lg:pr-8">
            <ProductCarousel imageData={productData.images!} />
          </LayoutColumn>
          <LayoutColumn xs={12} lg={5} className="flex flex-col lg:pl-8">
            <p className="text-gray-500">{productData.collection?.title}</p>
            <h1 className="text-xl lg:text-2xl">{productData.title}</h1>
            <p className="mt-2 text-lg">
              {price.cheapestPrice?.calculated_price}
            </p>
            <p className="mt-8">{productData.description}</p>
            <ProductOptions
              productItem={productData}
              customization={fashionDetails}
            />

            <p className="mt-4 text-gray-500">Estimate delivery 2-3 days</p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-xl font-medium lg:mt-20 lg:text-3xl">
          {collectionData.data?.product_page_heading}
        </h2>
        <div className="relative mt-8 max-w-[100vw] lg:h-[500px] 2xl:h-[800px]">
          <Image
            src={collectionData.data?.product_page_image?.url || ''}
            alt="Inspired interior"
            className="object-cover"
            fill
          />
        </div>
      </Layout>
      <div className="relative mt-8 h-[400px] w-screen overflow-hidden lg:mt-20 lg:h-[800px] 2xl:h-[1200px]">
        <Image
          src={collectionData.data?.product_page_wide_image?.url || ''}
          alt="Inspired interior"
          className="object-cover object-right"
          fill
        />
      </div>

      <Layout>
        <LayoutRow className="mt-8 lg:mt-20">
          <LayoutColumn xs={8} lg={5} className="relative h-96 lg:pr-12">
            <Image
              src={collectionData.data?.product_page_cta_image?.url || ''}
              alt="Inspired interior"
              className="object-cover"
              fill
            />
          </LayoutColumn>
          <LayoutColumn xs={12} lg={7} className="lg:pl-12">
            <h2 className="mt-8 text-lg lg:mt-20 lg:text-3xl lg:font-medium">
              {collectionData.data?.collection_page_heading}
            </h2>
            <Link
              href={`/collection/${productData.collection?.handle}`}
              className="mt-8 underline underline-offset-2"
            >
              {collectionData.data?.product_page_cta_link}
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
