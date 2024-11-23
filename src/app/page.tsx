// External packages
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Collections } from '@/components/landing-page/Collections';

// Images
import ImageHero from '@/public/images/home/hero.png';
import ImageArmedChair from '@/public/images/home/armed-chair.png';
import ImageSofa from '@/public/images/home/sofa.png';
import ImageAboutSofa from '@/public/images/home/about-sofa.png';

export default function Home() {
  return (
    <>
      <Header />
      <div className="mt-22 lg:mt-0">
        <Image
          src={ImageHero}
          alt="Main image that represents SofaSociety.Co"
          className="object-cover xl:h-[75vh]"
        />
      </div>
      <Layout>
        <LayoutRow className="mt-8 flex-col justify-between md:mt-16 lg:flex-row lg:items-center xl:mt-24">
          <LayoutColumn xs={12} lg={7}>
            <h2 className="text-2xl font-medium">
              Elevate Your Living Space with Unmatched Comfort & Style
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={3} className="lg:flex lg:justify-end">
            <p className="mt-6 lg:mt-0">
              Discover Your Perfect Sofa Today <br />
              <Link href="/" className="underline underline-offset-4">
                Explore Now
              </Link>
            </p>
          </LayoutColumn>
        </LayoutRow>
        <h2 className="mt-24 text-2xl font-medium lg:mt-32">Our prodcuts</h2>
        <LayoutRow className="mt-8 lg:mt-16">
          <LayoutColumn xs={6} className="cursor-pointer pr-1 lg:pr-4">
            <Image src={ImageSofa} alt="Sofa image" />
            <p className="mt-2 text-lg lg:mt-8">Sofas</p>
          </LayoutColumn>
          <LayoutColumn xs={6} className="cursor-pointer pl-1 lg:pl-4">
            <Image src={ImageArmedChair} alt="Armed chair" />
            <p className="mt-2 text-lg lg:mt-8">Arm Chairs</p>
          </LayoutColumn>
        </LayoutRow>
        <Collections />
        <h2 className="mt-24 text-2xl font-medium lg:mt-32">
          About sofa society
        </h2>
        <div className="mt-8 lg:mt-16">
          <Image src={ImageAboutSofa} alt="About us image of sofa" />
        </div>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row">
          <LayoutColumn xs={12} lg={5}>
            <h2 className="text-2xl font-medium">
              At Sofa Society, we believe that a sofa is the heart of every
              home.
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-16 flex flex-col gap-6">
            <p>
              We are dedicated to delivering high-quality, thoughtfully designed
              sofas that merge comfort and style effortlessly.
            </p>
            <p>
              Our mission is to transform your living space into a sanctuary of
              relaxation and beauty, with products built to last.
            </p>
            <Link href="/about" className="mt-6 underline underline-offset-4">
              Read more about Sofa Society
            </Link>
          </LayoutColumn>
        </LayoutRow>
      </Layout>

      <Footer />
    </>
  );
}
