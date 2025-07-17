'use client';

import * as React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { IconButton } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/Icon';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Assets
import ImagePalomaHeaven from '@/public/images/product/paloma-heaven.png';

const SwiperNavButtons: React.FC<{
  counter: number;
}> = ({ counter }) => {
  const swiper = useSwiper();

  return (
    <div className="absolute top-1/2 z-max flex w-full justify-between">
      <IconButton
        variation={counter !== 0 && counter % 2 === 0 ? 'solid' : 'outline'}
        onPress={() => {
          swiper.slidePrev();
        }}
      >
        <Icon name="arrow" />
      </IconButton>
      <IconButton
        variation={counter !== 0 && counter % 2 === 0 ? 'outline' : 'solid'}
        onPress={() => {
          swiper.slideNext();
        }}
      >
        <Icon name="arrow" className="rotate-180" />
      </IconButton>
    </div>
  );
};

export const ProductCarousel: React.FC<{}> = () => {
  const [counter, setCounter] = React.useState(0);
  return (
    <div className="relative w-96 rounded border">
      <Swiper
        pagination={{ type: 'fraction', clickable: true }}
        slidesPerView={'auto'}
        spaceBetween={30}
        onSlideChange={() => setCounter((prev) => prev + 1)}
        modules={[Pagination, Navigation]}
        className="mySwiper relative h-96 w-96"
        loop
      >
        <SwiperNavButtons counter={counter} />
        <SwiperSlide>
          <Image
            src={ImagePalomaHeaven}
            alt="What us"
            className="object-cover"
            fill
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={ImagePalomaHeaven}
            alt="What us"
            className="object-cover"
            fill
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
