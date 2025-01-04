'use client';

// Etxernal packages
import * as React from 'react';
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { ArrowButton } from '@/components/ui/ArrowButton';

// Images
import ImagePalomaHeaven from '@/public/images/shop/paloma-heaven.png';
import ImagePalomaHeavenDetails from '@/public/images/shop/paloma-heaven-details.png';

export const ImageSlider = () => {
  const scrollableContainerRef = React.useRef<null | HTMLDivElement>(null);

  // console.log(imageCount);
  const scrollContainerFn = (isDirectionLeft: boolean = false) => {
    const element = scrollableContainerRef.current;
    if (element) {
      if (isDirectionLeft)
        return (element.scrollLeft -= element.scrollWidth / 2);
      element.scrollLeft += element.scrollWidth / 2;
    }
  };
  return (
    <>
      <div className="relative -mx-6">
        <LayoutRow
          className="max-h-[500px] flex-nowrap overflow-x-scroll scroll-smooth lg:max-h-none lg:flex-row"
          ref={scrollableContainerRef}
        >
          <LayoutColumn xs={12} lg={8} className="flex-shrink-0 lg:pr-2">
            <Image
              className="h-full object-cover"
              src={ImagePalomaHeaven}
              alt="Representaion of your wanted product"
            />
          </LayoutColumn>
          <LayoutColumn xs={12} lg={8} className="flex-shrink-0 lg:pl-2">
            <Image
              className="h-full object-cover"
              src={ImagePalomaHeavenDetails}
              alt="Detailed representaion of your wanted product"
            />
          </LayoutColumn>
        </LayoutRow>
        <div className="absolute left-4 top-1/2 flex w-[calc(100%-32px)] justify-between">
          <ArrowButton
            variation="outline"
            onPress={() => scrollContainerFn(true)}
          />
          <ArrowButton direction="right" onPress={() => scrollContainerFn()} />
        </div>
        <div className="absolute bottom-4 left-1/2 mt-6 flex -translate-x-1/2 transform justify-center text-md lg:hidden">
          <p className="mr-4 underline underline-offset-4">1</p>
          <p>2</p>
        </div>
      </div>
      <div className="mt-6 hidden justify-center text-md lg:flex">
        <p className="mr-4 underline underline-offset-4">1</p>
        <p>2</p>
      </div>
    </>
  );
};
