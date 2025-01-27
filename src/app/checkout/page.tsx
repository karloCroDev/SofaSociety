// External packages
import Link from 'next/link';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';

import { Accordion } from '@/components/checkout/Accordion';
import { ProductDetailsCollapsible } from '@/components/checkout/ProductDetailsCollapsible';
import { Order } from '@/components/checkout/Order';

export default function Page() {
  return (
    <>
      <div className="absolute left-0 top-0 w-full">
        <Layout>
          <LayoutRow className="h-22 items-center justify-between">
            <Logo />
            <h3 className="text-md font-black lg:hidden">Checkout</h3>
          </LayoutRow>
        </Layout>
      </div>
      <ProductDetailsCollapsible />
      <Layout>
        <LayoutRow>
          <LayoutColumn lg={6} xs={12} className="lg:mt-32">
            <Accordion />
          </LayoutColumn>
          <LayoutColumn
            lg={5}
            xs={12}
            lgOffset={1}
            className="relative hidden lg:block"
          >
            <div className='pulled-background after:bg-grayscale-50 w-full p-8 pb-8 after:absolute after:left-0 after:top-0 after:z-[-1] after:h-full after:content-[""] lg:px-12 lg:pb-64 lg:pt-32'>
              <Order />
            </div>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </>
  );
}
