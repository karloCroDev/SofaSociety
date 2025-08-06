'use client';

// External packages
import * as React from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { HttpTypes } from '@medusajs/types';
import { usePathname, useRouter } from 'next/navigation';

// Lib
import { isStripe } from '@/lib2/constants';
import { withReactQueryProvider } from '@/lib2/react-query';

// Components
import { Button } from '@/components/ui/Button';

// Hooks
import { useInitiatePaymentSession, useSetPaymentMethod } from '@/hooks/cart';
import { ButtonProps } from 'react-aria-components';
import { AdditionalButtonProps } from '@/components/ui/LinkAsButton';

export const PaymentCardButton: React.FC<
  ButtonProps &
    AdditionalButtonProps & {
      cart: HttpTypes.StoreCart;
      cardComplete: boolean;
      selectedPaymentMethod: string;
      setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
    }
> = withReactQueryProvider(
  ({ cart, cardComplete, selectedPaymentMethod, setErrorMessage }) => {
    const session = cart.payment_collection?.payment_sessions?.find(
      (s) => s.status === 'pending'
    );

    if (isStripe(session?.provider_id) && isStripe(selectedPaymentMethod)) {
      return (
        <StripeCardPaymentButton
          setErrorMessage={setErrorMessage}
          cart={cart}
          cardComplete={cardComplete}
        />
      );
    }

    return (
      <PaymentMethodButton
        setErrorMessage={setErrorMessage}
        cart={cart}
        selectedPaymentMethod={selectedPaymentMethod}
      />
    );
  }
);

const StripeCardPaymentButton = ({
  cart,
  cardComplete,
  setErrorMessage,
}: {
  cart: HttpTypes.StoreCart;
  cardComplete?: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement('card');

  const router = useRouter();

  const setPaymentMethod = useSetPaymentMethod();

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === 'pending'
  );
  const pathname = usePathname();

  const initiatePaymentSession = useInitiatePaymentSession();

  const handleSubmit = async () => {
    try {
      const shouldInputCard = !session;

      if (!isStripe(session?.provider_id)) {
        await initiatePaymentSession.mutateAsync({ providerId: 'stripe' });
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
            setPaymentMethod.mutate({
              sessionId: session.id,
              token: token.token?.id,
            });
          }
        }

        return router.push(`${pathname}?step=completed`, {
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
      {!session ? 'Enter card details' : 'Complete'}
    </Button>
  );
};

const PaymentMethodButton = ({
  selectedPaymentMethod,
  setErrorMessage,
}: {
  cart: HttpTypes.StoreCart;
  selectedPaymentMethod: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const initiatePaymentSession = useInitiatePaymentSession();

  const handleSubmit = () => {
    initiatePaymentSession.mutate(
      {
        providerId: selectedPaymentMethod,
      },
      {
        onSuccess: () => {
          if (!isStripe(selectedPaymentMethod)) {
            return router.push(`${pathname}?step=completed`, {
              scroll: false,
            });
          }
        },
        onError: (err) => {
          setErrorMessage(err instanceof Error ? err.message : (err as string));
        },
      }
    );
  };

  return (
    <Button
      className="mt-6"
      onPress={handleSubmit}
      data-testid="submit-payment-button"
      isDisabled={!selectedPaymentMethod}
    >
      {isStripe(selectedPaymentMethod)
        ? 'Enter card details'
        : 'Continue to review'}
    </Button>
  );
};
