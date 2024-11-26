'use client';

// External packages
import * as React from 'react';
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { ArrowButton } from '@/components/ui/ArrowButton';

// Images
import ImageScandinavianSimplicity from '@/public/images/home/scandinavian-simplicity.png';
import ImageModernLuxe from '@/public/images/home/modern-luxe.png';
import ImageBohoChick from '@/public/images/home/boho-chick.png';

export const Collections = () => {
  const scrollableContainerRef = React.useRef<null | HTMLDivElement>(null);

  const scrollContainerFn = (isDirectionLeft: boolean = false) => {
    const element = scrollableContainerRef.current;
    if (element) {
      if (isDirectionLeft) element.scrollLeft -= 100;
      else element.scrollLeft += 100;
    }
  };
  return (
    <>
      <div className="mt-24 flex items-center gap-6 lg:mt-32">
        <h2 className="text-2xl font-medium">Collections</h2>
        <Button className="ml-auto">View All</Button>
        <div className="hidden lg:block">
          <ArrowButton
            variation="outline"
            onPress={() => scrollContainerFn(true)}
          />
          <ArrowButton
            direction="right"
            variation="outline"
            className="ml-2"
            onPress={() => scrollContainerFn()} // Po defaultu se passa event handler, te se isprerplice s argumentom
          />
        </div>
      </div>
      <LayoutRow
        className="mt-8 flex-nowrap overflow-x-scroll lg:mt-16 lg:flex-row"
        ref={scrollableContainerRef}
      >
        <LayoutColumn xs={10} lg={5} className="flex-shrink-0 pr-10">
          <Image
            src={ImageScandinavianSimplicity}
            alt="Scandinavian furnuture"
          />
          <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
            Scandinavian Simplicity
          </h4>
          <p className="mt-2 text-sm text-gray-500 lg:text-base">
            Minimalistic designs, neutral colors, and high-quality textures
          </p>
        </LayoutColumn>
        <LayoutColumn xs={10} lg={5} className="flex-shrink-0 pr-10">
          <Image src={ImageModernLuxe} alt="Modern luxe furnuture" />
          <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
            Modern Luxe
          </h4>
          <p className="mt-2 text-sm text-gray-500 lg:text-base">
            Sophisticated and sleek, these sofas blend modern design with
            luxurious comfort
          </p>
        </LayoutColumn>
        <LayoutColumn xs={10} lg={5} className="flex-shrink-0 pr-10">
          <Image src={ImageBohoChick} alt="Boho chick furnuture" />
          <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
            Boho Chic
          </h4>
          <p className="mt-2 text-sm text-gray-500 lg:text-base">
            Infused with playful textures and vibrant patterns with eclectic
            vibes.
          </p>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
};
