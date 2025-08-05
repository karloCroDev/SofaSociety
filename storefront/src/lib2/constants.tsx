import React from 'react';
import { Icon } from '@/components/ui/Icon';

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: 'Credit card',
    icon: <Icon name="credit-card" />,
  },
  'pp_stripe-ideal_stripe': {
    title: 'iDeal',
    icon: <Icon name="credit-card" />,
  },
  'pp_stripe-bancontact_stripe': {
    title: 'Bancontact',
    icon: <Icon name="credit-card" />,
  },
  pp_paypal_paypal: {
    title: 'PayPal',
    icon: <Icon name="credit-card" />,
  },
  pp_system_default: {
    title: 'Manual Payment',
    icon: <Icon name="credit-card" />,
  },
  // Add more payment providers here
};

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith('pp_stripe_');
};
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith('pp_paypal');
};
export const isManual = (providerId?: string) => {
  return providerId?.startsWith('pp_system_default');
};
