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
import { twJoin } from 'tailwind-merge';

export const ImageSlider = () => {
  const [imageCount, setImageCount] = React.useState(1);
  const scrollableContainerRef = React.useRef<null | HTMLDivElement>(null);

  // console.log(imageCount);
  const scrollContainerFn = (isDirectionLeft: boolean = false) => {
    const element = scrollableContainerRef.current;
    if (element) {
      if (isDirectionLeft) {
        element.scrollLeft -= element.scrollWidth / 2;
        setImageCount(imageCount - 1);
      } else {
        element.scrollLeft += element.scrollWidth / 2;
        setImageCount(imageCount + 1);
      }

      console.log(imageCount);

      if (imageCount === 2) {
        element.scrollLeft -= 10000;
        setImageCount(1);
      }
      if (imageCount === 1) {
        element.scrollLeft = 1000;
        setImageCount(2);
      }
    }
  };
  return (
    <>
      <div className="relative">
        <LayoutRow
          className="flex-nowrap overflow-x-scroll scroll-smooth lg:flex-row"
          ref={scrollableContainerRef}
        >
          <LayoutColumn lg={8} className="flex-shrink-0 lg:pr-2">
            <Image
              src={ImagePalomaHeaven}
              alt="Representaion of your wanted product"
            />
          </LayoutColumn>
          <LayoutColumn lg={8} className="flex-shrink-0 lg:pl-2">
            <Image
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
      </div>
      <div className="mt-6 flex justify-center text-md">
        <p
          className={twJoin(
            'mr-4',
            imageCount === 1 && 'underline underline-offset-4'
          )}
        >
          1
        </p>
        <p
          className={
            imageCount === 2 ? 'underline underline-offset-4' : undefined
          }
        >
          2
        </p>
      </div>
    </>
  );
};
