'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { HttpTypes } from '@medusajs/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import { Email } from '@/components/checkout/Email';
import { Address } from '@/components/checkout/Address';
import { Shipping } from '@/components/checkout/Shipping';
import { Payment } from '@/components/checkout/Payment';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { StepTypes } from '@/app/[location]/checkout/page';

// Lib
import { withReactQueryProvider } from '@/lib2/react-query';

export const Accordion: React.FC<{
  cart: HttpTypes.StoreCart;
  stepURL?: StepTypes;
}> = withReactQueryProvider(({ cart, stepURL }) => {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const [hasLoaded, setHadLoaded] = React.useState(false);

  React.useEffect(() => {
    if (hasLoaded) return;
    let currentStep: StepTypes; // Default to last step if there are no previous steps

    if (!cart.email) currentStep = 'email';
    else if (!cart.shipping_address) currentStep = 'address';
    else if (!cart.shipping_methods?.length) currentStep = 'shipping';
    else currentStep = 'payment';

    router.replace(`${pathname}?stepURL=${currentStep}`, { scroll: false });

    setHadLoaded(true);
  }, []);

  const step = searchParams.get('step');

  return (
    <RadixAccordion.Root
      type="single"
      value={stepURL || step || undefined}
      collapsible
    >
      <Email cart={cart} />
      <Address cart={cart} />

      <Shipping cart={cart} />
      <Payment cart={cart} />
      <LinkAsButton
        href="/confirmation"
        size="lg"
        className="mb-24 mt-8 w-full"
        // Karlo: Check all logic once completed and make this a button!
      >
        Place an order
      </LinkAsButton>
    </RadixAccordion.Root>
  );
});
