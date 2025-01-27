// External packages
import Image from 'next/image';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';

// Assets
import ImageHero from '@/public/images/about/hero.png';
import ImageLivingRoom from '@/public/images/about/living-room-sofa.png';
import ImageSofaDesign from '@/public/images/about/sofa-design.png';
import ImageSofaArray from '@/public/images/about/sofa-array.png';

export default function About() {
  return (
    <>
      <div className="mt-22 lg:mt-0">
        <Image
          src={ImageHero}
          alt="About image that represents SofaSociety.Co"
          className="object-cover lg:h-[800px]"
        />
      </div>
      <Layout>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={5}>
            <h2 className="text-xl font-medium lg:text-3xl">
              At Sofa Society, we believe that a sofa is the heart of every
              home.
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-6 lg:mt-16">
            <p>
              Welcome to Sofa Society, where we believe that comfort and style
              should be effortlessly intertwined. Our mission is to help you
              create beautiful, functional spaces that bring warmth and
              relaxation into your home.
            </p>
            <p className="mt-6">
              Every piece in our collection is designed with care, blending
              timeless craftsmanship with modern aesthetics to offer you the
              perfect balance between form and function.
            </p>
          </LayoutColumn>
        </LayoutRow>
        <div className="mt-24 lg:mt-36">
          <Image src={ImageLivingRoom} alt="Representation of living room" />
        </div>
        <LayoutRow>
          <LayoutColumn lg={6} xs={12} className="mt-8 md:mt-16 xl:mt-24">
            <h2 className="text-xl font-medium lg:text-3xl">
              We are here to make your living space a true reflection of your
              personal style.
            </h2>
            <p className="mt-6 lg:mt-10">
              At the heart of our brand is a deep commitment to quality. We
              understand that a sofa isn’t just another piece of furniture; it’s
              where you unwind, gather with loved ones, and make memories.
              That’s why we source only the finest materials and fabrics,
              ensuring that every sofa we offer is built to last.
            </p>
            <p className="mt-6 lg:mt-16">
              From luxurious leathers and soft linens to high-performance
              textiles, each fabric is carefully selected for its durability and
              beauty. Our attention to detail extends to every stitch and seam,
              guaranteeing that your sofa will not only look stunning but will
              also withstand the test of time.
            </p>
          </LayoutColumn>
        </LayoutRow>
        <LayoutRow className="mt-16 flex flex-col lg:mt-36 lg:flex-row lg:justify-between">
          <LayoutColumn xs={8} lg={5} className="mx-auto lg:mx-0">
            <Image src={ImageSofaDesign} alt="Sofa design interior" />
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6}>
            <p className="mt-16 lg:mt-0">
              Our design philosophy revolves around creating pieces that are
              both beautiful and practical. Inspired by Scandinavian simplicity,
              modern luxury, and timeless classics, our collections are curated
              to suit a wide variety of tastes and lifestyles. We understand
              that every home is different, so we offer a diverse range of
              styles, colors, and textures to help you find the perfect fit.
              Whether you prefer sleek modern lines or soft, inviting
              silhouettes, we have something to suit every space and
              personality.
            </p>
            <p className="mt-6 lg:mt-36 lg:text-lg">
              We believe that great design should be environmentally conscious,
              which is why we strive to minimise our environmental footprint
              through responsible sourcing and production practices.
              <span className="mt-6 block text-lg lg:mt-36 lg:inline">
                Our commitment to sustainability ensures that our products are
                not only beautiful but also kind to the planet.
              </span>
            </p>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
      <div>
        <Image
          src={ImageSofaArray}
          alt="Arrays of sofa"
          className="mt-24 px-4 lg:mt-36 lg:px-0"
        />
      </div>
      <Layout>
        <LayoutRow className="mt-8 flex flex-col justify-between md:mt-16 lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={5}>
            <h2 className="text-xl font-medium lg:text-3xl">
              Our customers are at the center of everything we do!
            </h2>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-6 flex flex-col lg:mt-16">
            <p className="lg:text-lg">
              Our team is here to help guide you through the process, offering
              personalised support to ensure that you find exactly what you’re
              looking for.
            </p>
            <p className="mt-0 lg:mt-6 lg:text-lg">
              We’re not just selling sofas – we’re helping you create spaces
              where you can relax, recharge, and make lasting memories.
              <span className="mt-6 block text-lg lg:mt-0 lg:inline">
                Thank you for choosing Sofa Society to be a part of your home!
              </span>
            </p>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </>
  );
}
