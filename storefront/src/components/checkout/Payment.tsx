'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { usePathname, useSearchParams } from 'next/navigation';
import { HttpTypes, StorePaymentSession } from '@medusajs/types';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { capitalize } from 'lodash';
import { Radio, RadioGroup } from 'react-aria-components';
import { CardElement, Elements } from '@stripe/react-stripe-js';

// Components
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { RadioButtonVisual } from '@/components/ui/Radio';
import { Input } from '@/components/ui/Input';
import { PaymentCardButton } from '@/components/checkout/StipePaymentButton';

// Hooks
import {
  useCartPaymentMethods,
  useGetPaymentMethod,
  useSetPaymentMethod,
} from '@/hooks/cart';
import { isStripe as isStripeFunc, paymentInfoObj } from '@/lib2/constants';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || 'temp');

export const Payment: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [cardBrand, setCardBrand] = React.useState<string | null>(null);
  const [cardComplete, setCardComplete] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('step') === 'payment';

  React.useEffect(() => {
    setError(null);
  }, [isOpen]);

  const setPaymentMethod = useSetPaymentMethod();

  const activeSession = cart?.payment_collection?.payment_sessions?.find(
    (paymentSession: StorePaymentSession) => paymentSession.status === 'pending'
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(
    activeSession?.provider_id ?? ''
  );
  const { data: availablePaymentMethods } = useCartPaymentMethods(
    cart?.region?.id ?? ''
  );
  const isStripe = isStripeFunc(activeSession?.provider_id);

  const paymentMethodId = activeSession?.data?.payment_method_id as string;
  const { data: paymentMethod } = useGetPaymentMethod(paymentMethodId);

  const handleRemoveCard = React.useCallback(() => {
    if (!activeSession?.id) {
      return;
    }

    try {
      setPaymentMethod.mutate(
        { sessionId: activeSession.id, token: null },

        {
          onSuccess: () => {
            setCardBrand(null);
            setCardComplete(false);
          },
          onError: () => setError('Failed to remove card'),
        }
      );
    } catch (err) {
      setError('Failed to remove card');
    }
  }, [activeSession?.id, setPaymentMethod]);

  React.useEffect(() => {
    if (paymentMethod) {
      setCardBrand(capitalize(paymentMethod?.card?.brand));
      setCardComplete(true);
    }
  }, [paymentMethod]);

  if (!cart) {
    return null;
  }
  return (
    <RadixAccordion.Item value="payment" className="border-t">
      <RadixAccordion.Header className="group w-full py-8">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="group-data-[state=open]:font-bold">4. Payment</p>

            {!isOpen &&
              activeSession &&
              cart.email &&
              cart.shipping_address &&
              cart.billing_address && (
                // cart?.shipping_methods &&
                // cart?.shipping_methods.length !== 0 &&
                <RadixAccordion.Trigger
                  className="cursor-pointer underline"
                  onClick={() =>
                    router.replace(`${pathname}?step=payment`, {
                      scroll: false,
                    })
                  }
                >
                  Change
                </RadixAccordion.Trigger>
              )}
          </div>

          {cart && activeSession && !isOpen && (
            <div className="mt-7 flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="text-grayscale-500">Payment method</div>
                <div className="text-grayscale-600">
                  {paymentInfoObj[selectedPaymentMethod]?.title ||
                    selectedPaymentMethod}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-grayscale-500">Payment details</div>
                {isStripeFunc(selectedPaymentMethod) && cardBrand ? (
                  <div className="text-grayscale-600 flex items-center gap-2">
                    {paymentInfoObj[selectedPaymentMethod]?.icon || (
                      <Icon name="credit-card" />
                    )}
                    <p>{cardBrand}</p>
                  </div>
                ) : (
                  <p>Please enter card details</p>
                )}
              </div>
            </div>
          )}
        </div>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
        <Elements
          stripe={stripe}
          options={{
            clientSecret: cart?.payment_collection?.payment_sessions?.[0].data
              .client_secret as string,
          }}
        >
          {availablePaymentMethods?.length && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={setSelectedPaymentMethod}
                aria-label="Payment methods"
              >
                {availablePaymentMethods
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
                        additionalLabel={paymentInfoObj[paymentMethod.id].icon}
                      >
                        {paymentInfoObj[paymentMethod.id].title}
                      </RadioButtonVisual>
                    </Radio>
                  ))}
              </RadioGroup>
            </>
          )}

          {isStripe && (
            <>
              <div className="mt-5">
                {isStripeFunc(selectedPaymentMethod) &&
                  (paymentMethod?.card?.brand ? (
                    <Input
                      inputProps={{
                        value: `**** **** ****  + ${paymentMethod?.card.last4}`,
                      }}
                      label="Card number"
                      isDisabled
                    />
                  ) : (
                    <div className="rounded border border-gray-200 p-4">
                      <CardElement
                        onChange={(e) => {
                          setCardBrand(
                            e.brand &&
                              e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                          );
                          setError(e.error?.message || null);
                          setCardComplete(e.complete);
                        }}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}

          {paymentMethod && isStripeFunc(selectedPaymentMethod) && (
            <Button
              className="mr-6 mt-6"
              onPress={handleRemoveCard}
              isDisabled={!cardComplete}
              data-testid="submit-payment-button"
            >
              Change card
            </Button>
          )}
          <PaymentCardButton
            setError={setError}
            selectedPaymentMethod={selectedPaymentMethod}
            cart={cart}
            cardComplete={cardComplete}
          />
        </Elements>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

// KARLO: TEST FOR VISA: 4242 4242 4242 4242 | 426 | 222....
