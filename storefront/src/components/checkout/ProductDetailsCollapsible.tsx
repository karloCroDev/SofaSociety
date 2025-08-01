'use client';

// External packages
import * as RadixCollapsible from '@radix-ui/react-collapsible';
import { HttpTypes } from '@medusajs/types';

// Components
import { Icon } from '@/components/ui/Icon';
import { Order } from '@/components/checkout/Order';
import { Layout } from '@/components/ui/Layout';

export const ProductDetailsCollapsible: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => (
  <RadixCollapsible.Root className="bg-gray-50 lg:hidden">
    <Layout>
      <RadixCollapsible.Trigger className="trigger container mt-22 flex w-full items-center justify-between py-6">
        <p>Order Summary</p>
        <div className="flex gap-4">
          <p>€{cart.total}</p>
          <Icon name="chevron" className="chevron"></Icon>
        </div>
      </RadixCollapsible.Trigger>
      <RadixCollapsible.Content className="mt-4 overflow-hidden data-[state=closed]:animate-slide-up-collapsible data-[state=open]:animate-slide-down-collapsible">
        <Order cart={cart} />
      </RadixCollapsible.Content>
    </Layout>
  </RadixCollapsible.Root>
);
