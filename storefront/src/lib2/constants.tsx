// External packages
import * as React from 'react';

// Components
import { Icon } from '@/components/ui/Icon';

export const paymentInfoObj: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: 'Credit card',
    icon: <Icon name="credit-card" />,
  },
  pp_paypal_paypal: {
    title: 'PayPal',
    icon: <Icon name="paypal" className="text-blue-400" />,
  },
};

export const isStripe = (providerId?: string) => {
  return providerId?.startsWith('pp_stripe_');
};
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith('pp_paypal');
};
export const isManual = (providerId?: string) => {
  return providerId?.startsWith('pp_system_default');
};
