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
import { isManual, isStripe } from '@/lib2/constants';

export const PaymentButton: React.FC<{
  cart: HttpTypes.StoreCart;
  selectPaymentMethod: () => void;
}> = withReactQueryProvider(({ cart, selectPaymentMethod }) => {
  const notReady =
    !cart || !cart.shipping_address || !cart.billing_address || !cart.email;

  // TODO: Add this once gift cards are implemented
  // const paidByGiftcard =
  //   cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  // if (paidByGiftcard) {
  //   return <GiftCardPaymentButton />
  // }

  const paymentSession = cart.payment_collection?.payment_sessions?.[0];

  console.log(cart.payment_collection?.payment_sessions?.[0]);

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return <StripePaymentButton notReady={notReady} cart={cart} />;
    case isManual(paymentSession?.provider_id):
      return <ManualTestPaymentButton notReady={notReady} />;
    default:
      return (
        <Button
          className="w-full"
          onPress={() => {
            selectPaymentMethod();
          }}
        >
          Select a payment method
        </Button>
      );
  }
});

const StripePaymentButton = withReactQueryProvider(
  ({ cart, notReady }: { cart: HttpTypes.StoreCart; notReady: boolean }) => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const placeOrder = usePlaceOrder();
    const router = useRouter();

    const onPaymentCompleted = () => {
      placeOrder.mutate(null, {
        onSuccess: (data) => {
          if (data?.type === 'order') {
            const countryCode =
              data.order.shipping_address?.country_code?.toLowerCase();
            router.push(`/${countryCode}/confirmation/${data.order.id}`);
          } else if (data?.error) {
            setErrorMessage(data.error.message);

            console.log(data.error.message);
          }
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
      if (!stripe) {
        return;
      }
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
              onPaymentCompleted();
            }

            setErrorMessage(error.message || null);

            console.log(error.message);
            return;
          }

          if (
            (paymentIntent && paymentIntent.status === 'requires_capture') ||
            paymentIntent.status === 'succeeded'
          ) {
            return onPaymentCompleted();
          }

          return;
        });
    };

    return (
      <>
        <Button
          isDisabled={disabled || notReady}
          isVisuallyDisabled={disabled || notReady}
          onPress={handlePayment}
          className="w-full"
        >
          STRIPEEEEE
        </Button>
      </>
    );
  }
);

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const placeOrder = usePlaceOrder();

  const router = useRouter();

  const onPaymentCompleted = () => {
    placeOrder.mutate(null, {
      onSuccess: (data) => {
        if (data?.type === 'order') {
          const countryCode =
            data.order.shipping_address?.country_code?.toLowerCase();
          router.push(`/${countryCode}/order/confirmed/${data.order.id}`);
        } else if (data?.error) {
          setErrorMessage(data.error.message);
        }
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  const handlePayment = () => {
    onPaymentCompleted();
  };

  return (
    <>
      <Button isDisabled={notReady} onPress={handlePayment} className="w-full">
        Place order
      </Button>
    </>
  );
};
