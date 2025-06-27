'use client';

// External packages
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HttpTypes } from '@medusajs/types';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/Icon';

export const Collections: React.FC<{
  collections: HttpTypes.StoreCollection[];
}> = ({ collections }) => {
  const scrollableContainerRef = React.useRef<null | HTMLDivElement>(null);

  // TODO: A šta ako želimo imati više ili manje od 4 itema u kolekciji? FIXED
  const scrollContainerFn = (
    isDirectionLeft: boolean = false,
    itemLength = 4
  ) => {
    const element = scrollableContainerRef.current;
    if (element) {
      if (isDirectionLeft)
        return (element.scrollLeft -= element.scrollWidth / itemLength);
      element.scrollLeft += element.scrollWidth / itemLength;
    }
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-medium lg:text-3xl">Collections</h2>
        <Button className="ml-auto">View All</Button>
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
              <div className="relative aspect-[3/4]">
                <Image
                  // @ts-ignore --> Ante: Nisam nasao nikakav conveter za metadatu za kolekcije, paa...
                  src={collection.metadata?.image?.url}
                  fill
                  alt={collection.title}
                />
              </div>
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
