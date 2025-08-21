'use client';

// External packages
import * as React from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { HttpTypes } from '@medusajs/types';
import { usePathname, useRouter } from 'next/navigation';

// Lib
import { isStripe } from '@/lib/constants';

// Components
import { Button } from '@/components/ui/Button';

// Hooks
import { useInitiatePaymentSession } from '@/hooks/checkout';
import { useChoosePaymentMethod } from '@/hooks/checkout';

export const StripeCardPaymentButton = ({
  cart,
  cardComplete,
  currentSession,
  setErrorMessage,
}: {
  cart: HttpTypes.StoreCart;
  currentSession?: HttpTypes.StorePaymentSession;
  cardComplete?: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const stripe = useStripe();

  const elements = useElements();
  const card = elements?.getElement('card');

  const router = useRouter();
  const pathname = usePathname();

  const choosePaymentMethod = useChoosePaymentMethod();
  const initiatePaymentSession = useInitiatePaymentSession('stripe');

  const handleSubmit = async () => {
    try {
      const shouldInputCard = !currentSession;

      if (!isStripe(currentSession?.provider_id)) {
        await initiatePaymentSession.mutateAsync();
      }
      if (!shouldInputCard) {
        if (card) {
          const token = await stripe?.createToken(card, {
            name: `${cart.billing_address?.first_name} ${cart.billing_address?.last_name}`,
            address_line1: cart.billing_address?.address_1 || '',
            address_line2: cart.billing_address?.address_2 || '',
            address_city: cart.billing_address?.city || '',
            address_country: cart.billing_address?.country_code || '',
            address_zip: cart.billing_address?.postal_code || '',
            address_state: cart.billing_address?.province || '',
          });

          if (token) {
            choosePaymentMethod.mutate({
              sessionId: currentSession.id,
              token: token.token?.id,
            });
          }
        }

        // Handling of closing all the accordions
        return router.push(pathname, {
          scroll: false,
        });
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : (err as string));
    }
  };

  return (
    <Button
      className="mt-6"
      onPress={handleSubmit}
      isDisabled={!cardComplete}
      data-testid="submit-payment-button"
    >
      {!currentSession ? 'Enter card details' : 'Complete'}
    </Button>
  );
};
