'use client';

// External packages
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { ArrowButton } from '@/components/ui/ArrowButton';

// Assets
import ImageScandinavianSimplicity from '@/public/images/home/scandinavian-simplicity.png';
import ImageModernLuxe from '@/public/images/home/modern-luxe.png';
import ImageBohoChic from '@/public/images/home/boho-chic.png';
import ImageTimlessCLassics from '@/public/images/home/timless-classiscs.png';

export const Collections = () => {
  const scrollableContainerRef = React.useRef<null | HTMLDivElement>(null);

  // TODO: A šta ako želimo imati više ili manje od 4 itema u kolekciji?
  const scrollContainerFn = (isDirectionLeft: boolean = false) => {
    const element = scrollableContainerRef.current;
    if (element) {
      if (isDirectionLeft)
        return (element.scrollLeft -= element.scrollWidth / 4);
      element.scrollLeft += element.scrollWidth / 4;
    }
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-medium lg:text-3xl">Collections</h2>
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
        className="mt-8 snap-x snap-mandatory flex-nowrap overflow-x-scroll scroll-smooth lg:mt-16 lg:flex-row"
        ref={scrollableContainerRef}
      >
        <LayoutColumn xs={10} lg={5} className="flex-shrink-0 snap-start pr-10">
          <Link href="/collection/scandinavian-simplicity">
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
          </Link>
        </LayoutColumn>
        <LayoutColumn xs={10} lg={5} className="flex-shrink-0 snap-start pr-10">
          <Link href="/collection/modern-luxe">
            <Image src={ImageModernLuxe} alt="Modern luxe furnuture" />
            <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
              Modern Luxe
            </h4>
            <p className="mt-2 text-sm text-gray-500 lg:text-base">
              Sophisticated and sleek, these sofas blend modern design with
              luxurious comfort
            </p>
          </Link>
        </LayoutColumn>
        <LayoutColumn xs={10} lg={5} className="flex-shrink-0 snap-start pr-10">
          <Link href="collection/boho-chic">
            <Image src={ImageBohoChic} alt="Boho chic furnuture" />
            <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
              Boho Chic
            </h4>
            <p className="mt-2 text-sm text-gray-500 lg:text-base">
              Infused with playful textures and vibrant patterns with eclectic
              vibes.
            </p>
          </Link>
        </LayoutColumn>
        <LayoutColumn xs={10} lg={5} className="flex-shrink-0 snap-start pr-10">
          <Link href="/collection/timeless-classics">
            <Image
              src={ImageTimlessCLassics}
              alt="Timeless classics furnuture"
            />
            <h4 className="mt-4 text-lg font-medium md:mt-6 xl:mt-8 2xl:text-xl">
              Timeless Classics
            </h4>
            <p className="mt-2 text-sm text-gray-500 lg:text-base">
              Elegant shapes and rich textures, traditional craftsmanship with
              modern comfort
            </p>
          </Link>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
};
