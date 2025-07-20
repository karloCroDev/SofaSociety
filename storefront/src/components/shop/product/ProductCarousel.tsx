'use client';

// External packages
import * as React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { IconButton } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/Icon';
import { HttpTypes } from '@medusajs/types';
import { twJoin, twMerge } from 'tailwind-merge';

// Styles (external)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SwiperNavButtons: React.FC<{
  activeIndex: boolean;
}> = ({ activeIndex }) => {
  const swiper = useSwiper();

  return (
    <div className="absolute top-1/2 z-max flex w-full justify-between px-2">
      <IconButton
        variation={activeIndex ? 'solid' : 'outline'}
        onPress={() => {
          swiper.slidePrev();
        }}
      >
        <Icon name="arrow" />
      </IconButton>
      <IconButton
        variation={activeIndex ? 'outline' : 'solid'}
        onPress={() => {
          swiper.slideNext();
        }}
      >
        <Icon name="arrow" className="rotate-180" />
      </IconButton>
    </div>
  );
};

export const ProductCarousel: React.FC<{
  imageData: HttpTypes.StoreProductImage[];
  isMobile?: boolean;
}> = ({ imageData, isMobile = false }) => {
  const [activeIndex, setActiveIndex] = React.useState(false);

  return (
    <div
      className={twMerge(
        'relative w-full overflow-hidden',
        isMobile && 'mt-22 lg:hidden'
      )}
    >
      <Swiper
        pagination={{ type: 'fraction', clickable: true }}
        slidesPerView={'auto'}
        spaceBetween={20} // 👈 adjust to control how much is revealed
        onSlideChange={(swipe) => setActiveIndex(!!swipe.activeIndex)}
        modules={[Pagination, Navigation]}
        className={twJoin(
          'mySwiper relative',
          !isMobile ? 'h-[650px]' : 'h-96'
        )}
      >
        {!isMobile && <SwiperNavButtons activeIndex={activeIndex} />}
        {imageData.map((image) => (
          <SwiperSlide
            key={image.id}
            className={twJoin(
              'relative overflow-hidden',
              !isMobile && '!w-[85%]'
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.url}
                alt="Product"
                className="object-cover"
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
