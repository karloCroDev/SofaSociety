'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { HttpTypes } from '@medusajs/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Components
import { Email } from '@/components/checkout/Email';
import { StripePaymentButton } from '@/components/checkout/StripePaymentButton';
import { Address } from '@/components/checkout/Address';
import { Shipping } from '@/components/checkout/Shipping';
import { Payment } from '@/components/checkout/Payment';
import { StepTypes } from '@/app/[location]/checkout/page';

// Lib
import { withReactQueryProvider } from '@/lib/config/react-query';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || 'temp');

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

  const allStepsChecker =
    !!cart.email &&
    !!cart.shipping_address &&
    !!cart.billing_address &&
    Array.isArray(cart.shipping_methods) &&
    cart.shipping_methods.length > 0 &&
    !!cart.payment_collection;

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret: cart?.payment_collection?.payment_sessions?.[0].data
          .client_secret as string,
      }}
    >
      <RadixAccordion.Root
        type="single"
        value={stepURL || step || undefined}
        collapsible
      >
        <Email cart={cart} />
        <Address cart={cart} />
        <Shipping cart={cart} />
        <Payment cart={cart} />
        <StripePaymentButton cart={cart} notReady={allStepsChecker} />
      </RadixAccordion.Root>
    </Elements>
  );
});
