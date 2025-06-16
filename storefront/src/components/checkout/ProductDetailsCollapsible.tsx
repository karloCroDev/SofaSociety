'use client';

// External packages
import * as RadixCollapsible from '@radix-ui/react-collapsible';

// Components
import { Icon } from '@/components/ui/Icon';
import { Order } from '@/components/checkout/Order';

export const ProductDetailsCollapsible = () => (
  <RadixCollapsible.Root className="bg-gray-50 lg:hidden">
    <RadixCollapsible.Trigger className="trigger mt-22 flex w-full items-center justify-between px-6 py-6">
      <p>Order Summary</p>
      <div className="flex gap-4">
        <p>€45</p>
        <Icon name="chevron" className="chevron"></Icon>
      </div>
    </RadixCollapsible.Trigger>
    <RadixCollapsible.Content className="mt-4 overflow-hidden data-[state=closed]:animate-slide-up-collapsible data-[state=open]:animate-slide-down-collapsible">
      <Order />
    </RadixCollapsible.Content>
  </RadixCollapsible.Root>
);
