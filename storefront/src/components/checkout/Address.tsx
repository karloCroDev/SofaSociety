'use client ';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { useCustomer } from '@/hooks2/auth';
import { usePathname, useSearchParams } from 'next/navigation';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CountrySelect } from '@/components/checkout/CountrySelect';
import { useRouter } from 'next/navigation';
import { HttpTypes } from '@medusajs/types';

export const Address: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'address';

  return (
    <RadixAccordion.Item value="address" className="border-t">
      <RadixAccordion.Header className="group w-full py-8">
        {isOpen ? (
          <p className="group-data-[state=open]:font-bold">
            2. Shipping address
          </p>
        ) : (
          <div className="flex justify-between">
            <p>2. Shipping address</p>
            <RadixAccordion.Trigger
              className="cursor-pointer underline"
              onClick={() =>
                router.replace(`${pathname}?step=address`, { scroll: false })
              }
            >
              Change
            </RadixAccordion.Trigger>
          </div>
        )}

        {!isOpen && cart.shipping_address && (
          <div className="mt-7 text-start">
            <div>
              Name:
              <span className="ml-16">Ante Antic</span>
            </div>
            <div>
              Ship to:
              <span className="ml-16">Trg Bana Jelacica</span>
            </div>
            <div>
              Phone:
              <span className="ml-16">+385 226 2226</span>
            </div>
          </div>
        )}
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
        <div className="flex flex-col gap-6 lg:gap-8">
          <CountrySelect />
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <Input label="First name" isRequired />
            <Input label="Last name" isRequired />
          </div>
          <Input label="Address" isRequired />
          <Input label="Apartment, suite, etc. (Optional)" />
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <Input label="Postal code" isRequired />
            <Input label="City" isRequired />
          </div>
          <Input label="Phone" isRequired />

          <Button
            size="lg"
            type="submit"
            className="mb-8 self-start"
            onPress={() => {
              console.log(pathname);
              router.replace(`${pathname}?step=shipping`, { scroll: false });
            }}
          >
            Next
          </Button>
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};
