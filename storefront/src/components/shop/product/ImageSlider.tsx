'use client';

// Etxernal packages
import * as React from 'react';
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { IconButton } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/Icon';

// Assets
import ImagePalomaHeaven from '@/public/images/product/paloma-heaven.png';
import ImagePalomaHeavenDetails from '@/public/images/product/paloma-heaven-details.png';
import { HttpTypes } from '@medusajs/types';

export const ImageSlider: React.FC<{
  imageData: HttpTypes.StoreProductImage[];
}> = ({ imageData }) => {
  const scrollableContainerRef = React.useRef<null | HTMLDivElement>(null);

  const scrollContainerFn = (isDirectionLeft: boolean = false) => {
    const element = scrollableContainerRef.current;
    if (element) {
      if (isDirectionLeft)
        return (element.scrollLeft -= element.scrollWidth / 2);
      element.scrollLeft += element.scrollWidth / 2;
    }
  };
  return (
    <div className="relative">
      <LayoutRow
        className="max-h-[500px] snap-x snap-mandatory flex-nowrap overflow-x-scroll scroll-smooth lg:max-h-none lg:flex-row lg:gap-4"
        ref={scrollableContainerRef}
      >
        <LayoutColumn
          lg={8}
          className="relative h-[600px] flex-shrink-0 snap-start"
        >
          <Image
            className="h-full object-cover"
            src={imageData[0].url}
            alt="Representaion of your wanted product"
            fill
          />
        </LayoutColumn>
        <LayoutColumn
          lg={8}
          className="relative h-[600px] flex-shrink-0 snap-start"
        >
          <Image
            className="object-cover"
            src={imageData[1].url}
            alt="Detailed representaion of your wanted product"
            fill
          />
        </LayoutColumn>
      </LayoutRow>
      <div className="mt-6 hidden justify-center text-md lg:flex">
        <p className="mr-4 underline underline-offset-4">1</p>
        <p>2</p>
      </div>

      <div className="absolute left-4 top-1/2 flex w-[calc(100%-32px)] justify-between">
        <IconButton variation="outline" onPress={() => scrollContainerFn(true)}>
          <Icon name="arrow" />
        </IconButton>
        <IconButton onPress={() => scrollContainerFn()}>
          <Icon name="arrow" className="rotate-180" />
        </IconButton>
      </div>
      <div className="absolute bottom-4 left-1/2 mt-6 flex -translate-x-1/2 transform justify-center text-md lg:hidden">
        <p className="mr-4 underline underline-offset-4">1</p>
        <p>2</p>
      </div>
    </div>
  );
};
