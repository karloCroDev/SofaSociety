'use client ';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { useCustomer } from '@/hooks2/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CountrySelect } from '@/components/checkout/CountrySelect';
import { CheckboxWithLabel } from '@/components/ui/Checkbox';
import { HttpTypes } from '@medusajs/types';

export const Email: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => {
  const { data: customer } = useCustomer();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'email';

  return (
    <RadixAccordion.Item value="email" className="lg:-mt-8">
      <RadixAccordion.Header className="group w-full py-8">
        {isOpen ? (
          <p className="group-data-[state=open]:font-bold">1. Email</p>
        ) : (
          <div className="flex justify-between">
            <p>1. Email</p>
            <RadixAccordion.Trigger
              className="cursor-pointer underline"
              onClick={() =>
                router.replace(`${pathname}?step=email`, { scroll: false })
              }
            >
              Change
            </RadixAccordion.Trigger>
          </div>
        )}
        {!isOpen && cart.email && (
          <div className="mt-7 text-start text-sm">
            Email:
            <span className="ml-16">{customer?.email}</span>
          </div>
        )}
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
        <div className="flex flex-col gap-6 lg:gap-8">
          <Input label="Email" isRequired type="email" />
          <div className="text-2xs flex items-start gap-2">
            <CheckboxWithLabel className="self-start text-sm text-gray-500">
              What to get news and offers? Ok, yes and some discounts. But only
              if you subscribe.
            </CheckboxWithLabel>
          </div>
          <Button
            size="lg"
            type="submit"
            className="mb-8 self-start"
            onPress={() =>
              router.replace(`${pathname}?step=address`, { scroll: false })
            }
          >
            Next
          </Button>
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};
