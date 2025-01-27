'use client';

// External packages
import * as RadixCollapsible from '@radix-ui/react-collapsible';

// Components
import { Icon } from '@/components/ui/Icon';
import { Order } from '@/components/checkout/Order';

export const ProductDetailsCollapsible = () => (
  <RadixCollapsible.Root className="mb-8 lg:hidden">
    <RadixCollapsible.Trigger className="trigger h-18 bg-grayscale-50 mt-32 flex w-full items-center justify-between px-6">
      <p>Order Summary</p>
      <div className="flex gap-4">
        <p>€45</p>
        <Icon name="chevron" className="chevron"></Icon>
      </div>
    </RadixCollapsible.Trigger>
    <RadixCollapsible.Content className="data-[state=closed]:animate-slide-up-collapsible data-[state=open]:animate-slide-down-collapsible overflow-hidden">
      <Order />
    </RadixCollapsible.Content>
  </RadixCollapsible.Root>
);
