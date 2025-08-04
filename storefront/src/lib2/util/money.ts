// External packages
import { HttpTypes } from '@medusajs/types';

// Ante: Ovo nisam puno mijenjao jer pretpostavljam da ovako inaće handleate na drugim projektima

type ConvertToLocaleParams = {
  amount: number;
  currency_code: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = 'en-US',
}: ConvertToLocaleParams) => {
  return typeof currency_code === 'string' && currency_code.trim()
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString();
};

export const getPercentageDiff = (original: number, calculated: number) => {
  const diff = original - calculated;
  const decrease = (diff / original) * 100;

  return decrease.toFixed();
};

export const getPricesForVariant = (variant: HttpTypes.StoreProductVariant) => {
  if (!variant?.calculated_price?.calculated_amount) {
    return null;
  }

  return {
    calculated_price_number: variant.calculated_price.calculated_amount,
    calculated_price: convertToLocale({
      amount: variant.calculated_price.calculated_amount,
      currency_code: variant.calculated_price.currency_code ?? '',
    }),
    original_price_number: variant.calculated_price.original_amount,
    original_price: convertToLocale({
      amount: variant.calculated_price.original_amount ?? 0,
      currency_code: variant.calculated_price.currency_code ?? '',
    }),
    currency_code: variant.calculated_price.currency_code,
    price_type: variant.calculated_price.calculated_price?.price_list_type,
    percentage_diff: getPercentageDiff(
      variant.calculated_price.original_amount ?? 0,
      variant.calculated_price.calculated_amount
    ),
  };
};

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct;
  variantId?: string;
}) {
  if (!product || !product.id) {
    throw new Error('No product provided');
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null;
    }

    const cheapestVariant = product.variants
      .filter((v) => !!v.calculated_price)
      .sort((a, b) => {
        return (
          (a.calculated_price?.calculated_amount ?? 0) -
          (b.calculated_price?.calculated_amount ?? 0)
        );
      })[0];

    return getPricesForVariant(cheapestVariant);
  };

  const variantPrice = () => {
    if (!product || !variantId) {
      return null;
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    );

    if (!variant) {
      return null;
    }

    return getPricesForVariant(variant);
  };

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  };
}
