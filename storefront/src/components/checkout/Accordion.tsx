'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { Radio, RadioGroup } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Input } from '@/components/ui/Input';
import { CheckboxWithLabel } from '@/components/ui/Checkbox';
import { CountrySelect } from '@/components/checkout/CountrySelect';
import { RadioButtonVisual } from '@/components/ui/Radio';
import { Icon } from '@/components/ui/Icon';
import { getCustomer } from '@/lib2/data/auth';
import { useCustomer } from '@/hooks2/auth';
import { withReactQueryProvider } from '@/lib/util/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { StepTypes } from '@/app/[location]/checkout/page';
import { HttpTypes } from '@medusajs/types';
import { Email } from '@/components/checkout/Email';
import { Address } from '@/components/checkout/Address';
import { Shipping } from '@/components/checkout/Shipping';
import { Payment } from '@/components/checkout/Payment';

export const Accordion: React.FC<{
  cart: HttpTypes.StoreCart;
  stepURL?: StepTypes;
  location: string;
}> = withReactQueryProvider(({ cart, stepURL, location }) => {
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
      <Email cart={cart} location={location} />
      <Address cart={cart} />

      <Shipping cart={cart} />
      <Payment cart={cart} />
      <LinkAsButton
        href="/confirmation"
        size="lg"
        className="mb-24 mt-8 w-full"
      >
        Place an order
      </LinkAsButton>
    </RadixAccordion.Root>
  );
});
