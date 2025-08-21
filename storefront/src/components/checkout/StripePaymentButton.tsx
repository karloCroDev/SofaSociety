'use client';

// External packages
import * as React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { HttpTypes } from '@medusajs/types';
import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui/Button';

// Lib
import { withReactQueryProvider } from '@/lib2/config/react-query';
import { placeOrder } from '@/lib2/data/checkout';

export const StripePaymentButton = withReactQueryProvider(
  ({ cart, notReady }: { cart: HttpTypes.StoreCart; notReady: boolean }) => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const router = useRouter();
    const stripe = useStripe();

    const session = cart.payment_collection?.payment_sessions?.find(
      (s) => s.status === 'pending'
    );

    const onCompletion = async () => {
      const data = await placeOrder();

      if (data.type === 'order')
        return router.push(`/confirmation/${data.order.id}`);

      setErrorMessage(data.error.message);
    };

    const isSuccessStatus = (status?: string) => {
      return status === 'succeeded' || status === 'requires_capture';
    };

    const handlePayment = async () => {
      if (!stripe || !session?.data?.client_secret) return;

      try {
        const result = await stripe.confirmCardPayment(
          session.data.client_secret as string,
          {
            payment_method: session.data.payment_method_id as string,
          }
        );

        if (
          isSuccessStatus(
            result.paymentIntent?.status || result.error?.payment_intent?.status
          )
        ) {
          return onCompletion();
        }

        if (result.error) {
          setErrorMessage(result.error.message || null);
          console.error(result.error.message);
        }
      } catch (err) {
        setErrorMessage('Unexpected error occurred.');
        console.error(err);
      }
    };

    return (
      <>
        <Button
          isDisabled={!stripe || !session?.data?.payment_method_id || notReady}
          isVisuallyDisabled={
            !stripe || !session?.data?.payment_method_id || notReady
          }
          onPress={handlePayment}
          className="mt-6 w-full"
        >
          Place an order
        </Button>
        {errorMessage && (
          <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
        )}
      </>
    );
  }
);
