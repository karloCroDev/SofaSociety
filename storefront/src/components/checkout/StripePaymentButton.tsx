'use client';

// External packages
import * as React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { HttpTypes } from '@medusajs/types';
import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui/Button';

// Hooks
import { usePlaceOrder } from '@/hooks/cart';

// Lib
import { withReactQueryProvider } from '@/lib2/react-query';

export const StripePaymentButton = withReactQueryProvider(
  ({ cart, notReady }: { cart: HttpTypes.StoreCart; notReady: boolean }) => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const { mutate } = usePlaceOrder();
    const router = useRouter();

    const onCompletion = () => {
      mutate(null, {
        onSuccess: (data) => {
          if (!data) return;

          if (data?.type === 'order') {
            const countryCode =
              data.order.shipping_address?.country_code?.toLowerCase();
            return router.push(`/${countryCode}/confirmation/${data.order.id}`);
          }

          setErrorMessage(data.error.message);

          console.log(data.error.message);
          console.log('Ajde u k stripe :(');
        },
        onError: (error) => {
          setErrorMessage(error.message);
        },
      });
    };

    const stripe = useStripe();

    const session = cart.payment_collection?.payment_sessions?.find(
      (s) => s.status === 'pending'
    );

    const disabled =
      !stripe || !session?.data?.payment_method_id ? true : false;

    const handlePayment = async () => {
      if (!stripe) return;
      const paymentMethodId = session?.data?.payment_method_id as string;

      await stripe
        .confirmCardPayment(session?.data.client_secret as string, {
          payment_method: paymentMethodId,
        })
        .then(({ error, paymentIntent }) => {
          if (error) {
            const pi = error.payment_intent;

            if (
              (pi && pi.status === 'requires_capture') ||
              (pi && pi.status === 'succeeded')
            ) {
              onCompletion();
            }

            setErrorMessage(error.message || null);

            console.log(error.message);
            return;
          }

          if (
            (paymentIntent && paymentIntent.status === 'requires_capture') ||
            paymentIntent.status === 'succeeded'
          ) {
            onCompletion();
          }
        });
    };

    return (
      <>
        <Button
          isDisabled={disabled || notReady}
          isVisuallyDisabled={disabled || notReady}
          onPress={handlePayment}
          className="mt-6 w-full"
        >
          Place an order
        </Button>
        {errorMessage && (
          <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
        )}
        <p></p>
      </>
    );
  }
);
