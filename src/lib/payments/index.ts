import { FEATURES } from '@/config/features';
import { PaymentProvider } from './types';
import { polarProvider } from './polar';
import { stripeProvider } from './stripe';
import { midtransProvider } from './midtrans';

export * from './types';
export { polarProvider, stripeProvider, midtransProvider };

/**
 * Returns the currently active payment provider based on FEATURES.paymentProvider
 */
export function getPaymentProvider(): PaymentProvider {
  switch (FEATURES.paymentProvider) {
    case 'stripe':
      return stripeProvider;
    case 'midtrans':
      return midtransProvider;
    case 'polar':
    default:
      return polarProvider;
  }
}

export const payment = getPaymentProvider();
