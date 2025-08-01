// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { usePathname, useSearchParams } from 'next/navigation';
import { HttpTypes } from '@medusajs/types';
import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export const Payment: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'shipping';
  return (
    <RadixAccordion.Item value="payment" className="border-t">
      <RadixAccordion.Header className="group w-full py-8">
        <div className="flex justify-between">
          <p className="group-data-[state=open]:font-bold">4. Payment</p>

          {!isOpen &&
            cart.email &&
            cart.shipping_address &&
            cart.billing_address &&
            !!cart.shipping_methods?.length && (
              <RadixAccordion.Trigger
                className="cursor-pointer underline"
                onClick={() =>
                  router.replace(`${pathname}?step=shipping`, {
                    scroll: false,
                  })
                }
              >
                Change
              </RadixAccordion.Trigger>
            )}
        </div>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
        <Button
          size="lg"
          iconRight={<Icon name="arrow-up" />}
          className="w-full"
        >
          Pay with stripe
        </Button>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};
