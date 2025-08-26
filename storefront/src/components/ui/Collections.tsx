'use client';

// External packages
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HttpTypes } from '@medusajs/types';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { IconButton } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/Icon';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import z from 'zod';

const collectionMetadataSchema = z
  .object({
    image: z
      .object({
        url: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  })
  .optional()
  .nullable();

const CollectionImage: React.FC<{ collection: HttpTypes.StoreCollection }> = ({
  collection,
}) => {
  const validatedMetadata = collectionMetadataSchema.safeParse(
    collection.metadata
  );

  if (!validatedMetadata.success || !validatedMetadata.data?.image?.url) {
    return null;
  }

  return (
    <div className="relative aspect-[3/4]">
      <Image
        src={validatedMetadata.data.image.url}
        fill
        alt={collection.title || ''}
      />
    </div>
  );
};

export const Collections: React.FC<{
  collections: HttpTypes.StoreCollection[];
}> = ({ collections }) => {
  const scrollableContainerRef = React.useRef<null | HTMLDivElement>(null);

  const scrollContainerFn = (isDirectionLeft: boolean = false) => {
    const element = scrollableContainerRef.current;
    if (element) {
      const length = collections.length;
      if (isDirectionLeft)
        return (element.scrollLeft -= element.scrollWidth / length);
      element.scrollLeft += element.scrollWidth / length;
    }
  };

  if (!collections.length)
    return [...Array(4)].map((_, index) => (
      <CollectionCardSkeleton key={index} />
    ));

  return (
    <>
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-medium lg:text-3xl">Collections</h2>
        <LinkAsButton href="/shop" className="ml-auto">
          View All
        </LinkAsButton>
        <div className="hidden lg:block">
          <IconButton
            variation="outline"
            onPress={() => scrollContainerFn(true)}
          >
            <Icon name="arrow" />
          </IconButton>
          <IconButton
            variation="outline"
            className="ml-2"
            onPress={() => scrollContainerFn()} // Po defaultu se passa event handler, te se isprerplice s argumentom
          >
            <Icon name="arrow" className="rotate-180" />
          </IconButton>
        </div>
      </div>
      <LayoutRow
        className="mt-8 snap-x snap-mandatory flex-nowrap overflow-x-scroll scroll-smooth lg:mt-16 lg:flex-row"
        ref={scrollableContainerRef}
      >
        {collections.map((collection) => (
          <LayoutColumn
            xs={10}
            lg={5}
            className="flex-shrink-0 snap-start pr-10"
            key={collection.id}
          >
            <Link href={`/collection/${collection.handle}`}>
              <CollectionImage collection={collection} />
              <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
                {collection.title}
              </h4>
              <p className="mt-2 text-sm text-gray-500 lg:text-base">
                {String(collection.metadata?.description)}
              </p>
            </Link>
          </LayoutColumn>
        ))}
      </LayoutRow>
    </>
  );
};

const CollectionCardSkeleton = () => (
  <div className="flex-shrink-0 snap-start pr-10">
    <div className="animate-pulse">
      <div className="relative aspect-[3/4] w-full rounded-lg bg-gray-200" />
      <div className="mt-4 h-6 w-3/4 rounded bg-gray-200 md:mt-6 xl:mt-8 2xl:h-7" />
      <div className="mt-2 h-4 w-full rounded bg-gray-200 lg:h-5" />
    </div>
  </div>
);
