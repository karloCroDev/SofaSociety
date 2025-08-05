'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { usePathname, useSearchParams } from 'next/navigation';
import { HttpTypes, StorePaymentSession } from '@medusajs/types';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

// Components
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Form } from '@/components/ui/Form';
import { completeCartServer } from '@/lib2/data/payment';
import { isStripe } from '@/lib2/constants';
import { useCartPaymentMethods, useGetPaymentMethod } from '@/hooks/cart';
import { Radio, RadioGroup } from 'react-aria-components';
import { RadioButtonVisual } from '@/components/ui/Radio';
import { PaymentMethodButton } from '@/components/checkout/StipePaymentButton';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || 'temp');

export const Payment: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'shipping';

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const clientSecret = cart?.payment_collection?.payment_sessions?.[0].data
    .client_secret as string;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(
    cart.payment_collection?.payment_sessions?.[0].provider_id || ''
  );

  const stripeChecker = isStripe(
    cart.payment_collection?.payment_sessions?.[0].provider_id
  );

  const { data: allPaymentMethods } = useCartPaymentMethods(
    cart?.region?.id ?? ''
  );

  const activeSession = cart?.payment_collection?.payment_sessions?.find(
    (paymentSession: StorePaymentSession) => paymentSession.status === 'pending'
  );

  const paymentMethodId = activeSession?.data?.payment_method_id as string;
  const { data: paymentMethod } = useGetPaymentMethod(paymentMethodId);

  console.log(clientSecret);

  return (
    <RadixAccordion.Item value="payment" className="border-t">
      <RadixAccordion.Header className="group w-full py-8">
        <div className="flex justify-between">
          <p className="group-data-[state=open]:font-bold">4. Payment</p>

          {!isOpen && cart.email && (
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
        {allPaymentMethods?.length && (
          <>
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={setSelectedPaymentMethod}
              aria-label="Payment methods"
            >
              {allPaymentMethods
                .sort((a, b) => {
                  return a.id > b.id ? 1 : -1;
                })

                .map((paymentMethod) => (
                  <Radio
                    key={paymentMethod.id}
                    className="group"
                    value={paymentMethod.id}
                  >
                    <RadioButtonVisual
                      additionalLabel={<Icon name="credit-card" />}
                    >
                      Credit card
                    </RadioButtonVisual>
                  </Radio>
                ))}
            </RadioGroup>
            <PaymentMethodButton
              cart={cart}
              selectedPaymentMethod={selectedPaymentMethod}
              createQueryString={createQueryString}
            />
          </>
        )}

        {stripeChecker && (
          <>
            <Elements
              stripe={stripe}
              options={{
                clientSecret,
              }}
            >
              <StripeForm cart={cart} clientSecret={clientSecret} />
            </Elements>
          </>
        )}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

const StripeForm: React.FC<{
  cart: HttpTypes.StoreCart;
  clientSecret?: string;
}> = ({ cart, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  console.log(clientSecret);
  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const card = elements?.getElement(CardElement);

    if (!stripe || !elements || !card || !clientSecret) {
      return;
    }

    setLoading(true);
    try {
      // Ante: Ughh, je li imaš neki prijedlog da ovo lijepše handleam?
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,

        {
          payment_method: {
            card,
            billing_details: {
              name: `${cart.shipping_address?.first_name} ${cart.shipping_address?.last_name}`,
              email: cart.email,
              phone: cart.billing_address?.phone,
              address: {
                city: cart.billing_address?.city,
                country: cart.billing_address?.country_code,
                line1: cart.billing_address?.address_1,
                line2: cart.billing_address?.address_2,
                postal_code: cart.billing_address?.postal_code,
              },
            },
          },
        }
      );

      if (error) {
        console.error(error);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        // Move cart completion to the server

        const result = await completeCartServer(cart.id);
        if (result.success) {
          // router.push('/confirmation');
          console.log('Sigmaa', result);
        }
      }
    } catch (err) {
      throw new Error('Payment failed`');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handlePayment} className="flex flex-col gap-8">
      <CardElement />
      <Button isVisuallyDisabled={loading} isDisabled={loading} />
    </Form>
  );
};
