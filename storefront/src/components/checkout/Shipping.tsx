// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { usePathname, useSearchParams } from 'next/navigation';

// Components
import { Button } from '@/components/ui/Button';
import { RadioButtonVisual } from '@/components/ui/Radio';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from 'react-aria-components';
import { HttpTypes } from '@medusajs/types';

export const Shipping: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'shipping';
  return (
    <RadixAccordion.Item value="shipping" className="border-t">
      <RadixAccordion.Header className="group w-full py-8">
        {isOpen ? (
          <p className="group-data-[state=open]:font-bold">3. Shipping</p>
        ) : (
          <div className="flex justify-between">
            <p>3. Shipping</p>

            <RadixAccordion.Trigger
              className="cursor-pointer underline"
              onClick={() =>
                router.replace(`${pathname}?step=shipping`, { scroll: false })
              }
            >
              Change
            </RadixAccordion.Trigger>
          </div>
        )}
        {!isOpen && !!cart.shipping_methods?.length && (
          <div className="mt-7 text-start text-sm">
            Shipping:
            <span className="ml-16">Standard delivery 3-5 days</span>
          </div>
        )}
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
        <RadioGroup defaultValue="Standard delivery">
          <Radio className="group" value="standard-delivery">
            <RadioButtonVisual additionalLabel="€50">
              Standard delivery
            </RadioButtonVisual>
          </Radio>
          <Radio value="fast-delivery" className="group">
            <RadioButtonVisual additionalLabel="€100" className="mt-2">
              Fast delivery
            </RadioButtonVisual>
          </Radio>
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
};
