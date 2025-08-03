// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { HttpTypes } from '@medusajs/types';
import { Radio, RadioGroup } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { RadioButtonVisual } from '@/components/ui/Radio';
import { useCartShippingMethods } from '@/hooks/cart';

// Lib
import { convertToLocale } from '@/lib/util/money';
import { withReactQueryProvider } from '@/lib/util/react-query';
import {
  useGetCartShippingOptions,
  useShippingOptionCheckout,
} from '@/hooks2/checkout';

export const Shipping: React.FC<{
  cart: HttpTypes.StoreCart;
}> = withReactQueryProvider(({ cart }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'shipping';

  const { data: allShippingMethods } = useGetCartShippingOptions(cart.id); // Ante: Hej ne dobivam ništa za ovu vijrednost vrijednost, je li tako treba biti ili sam ja nešto falio?
  const { mutate } = useShippingOptionCheckout();

  return (
    <RadixAccordion.Item value="shipping" className="border-t">
      <RadixAccordion.Header className="group w-full py-8">
        <div className="flex justify-between">
          <p className="group-data-[state=open]:font-bold">3. Shipping</p>
          {!isOpen && cart.email && cart.shipping_address && (
            <RadixAccordion.Trigger
              className="cursor-pointer underline"
              onClick={() =>
                router.replace(`${pathname}?step=shipping`, { scroll: false })
              }
            >
              Change
            </RadixAccordion.Trigger>
          )}
        </div>

        {!isOpen && !!cart.shipping_methods?.length && (
          <div className="mt-7 text-start text-sm">
            Shipping:
            <span className="ml-16">Standard delivery 3-5 days</span>
          </div>
        )}
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
        {/* Karlo: Kada dobijes vrijednosti testiraj ovo! */}
        <RadioGroup
          defaultValue="Standard delivery"
          onChange={(val) => {
            mutate({ cartId: cart.id, optionId: val.toString() });
          }}
        >
          {allShippingMethods?.map((method) => (
            <Radio key={method.id} className="group" value={method.id}>
              <RadioButtonVisual
                additionalLabel={convertToLocale({
                  amount: method.amount!,
                  currency_code: cart?.currency_code,
                })}
              >
                {method.name}
              </RadioButtonVisual>
            </Radio>
          ))}
        </RadioGroup>
        <Button
          size="lg"
          type="submit"
          className="my-8"
          onPress={() =>
            router.replace(`${pathname}?step=payment`, { scroll: false })
          }
        >
          Next
        </Button>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
});
