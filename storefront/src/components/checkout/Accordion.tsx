'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { Radio, RadioGroup } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Input } from '@/components/ui/Input';
import { CheckboxWithLabel } from '@/components/ui/Checkbox';
import { CountrySelect } from '@/components/checkout/CountrySelect';
import { RadioButtonVisual } from '@/components/ui/Radio';
import { Icon } from '@/components/ui/Icon';
import { getCustomer } from '@/lib2/data/auth';
import { useCustomer } from '@/hooks2/auth';
import { withReactQueryProvider } from '@/lib/util/react-query';

export const Accordion = withReactQueryProvider(() => {
  const [step, setStep] = React.useState('email');

  const { data: customer } = useCustomer();

  return (
    <RadixAccordion.Root type="single" value={step} collapsible>
      <RadixAccordion.Item value="email" className="lg:-mt-8">
        <RadixAccordion.Header className="group w-full py-8">
          {step === '1' ? (
            <p className="group-data-[state=open]:font-bold">1. Email</p>
          ) : (
            <div className="flex justify-between">
              <p>1. Email</p>

              <RadixAccordion.Trigger className="cursor-pointer underline">
                Change
              </RadixAccordion.Trigger>
            </div>
          )}
          {step !== '1' && (
            <div className="mt-7 text-start text-sm">
              Email:
              <span className="ml-16">example@test.com</span>
            </div>
          )}
        </RadixAccordion.Header>
        <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
          <div className="flex flex-col gap-6 lg:gap-8">
            <Input label="Email" isRequired type="email" />
            <div className="text-2xs flex items-start gap-2">
              <CheckboxWithLabel className="self-start text-sm text-gray-500">
                What to get news and offers? Ok, yes and some discounts. But
                only if you subscribe.
              </CheckboxWithLabel>
            </div>
            <Button
              size="lg"
              type="submit"
              className="mb-8 self-start"
              onPress={() => setStep('2')}
            >
              Next
            </Button>
          </div>
        </RadixAccordion.Content>
      </RadixAccordion.Item>

      {/* Step 2 */}
      <RadixAccordion.Item value="checkout" className="border-t">
        <RadixAccordion.Header className="group w-full py-8">
          {step === '2' ? (
            <p className="group-data-[state=open]:font-bold">
              2. Shipping address
            </p>
          ) : (
            <div className="flex justify-between">
              <p>2. Shipping address</p>

              <RadixAccordion.Trigger className="cursor-pointer underline">
                Change
              </RadixAccordion.Trigger>
            </div>
          )}
          {step !== '2' && (
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
              onPress={() => setStep('3')}
            >
              Next
            </Button>
          </div>
        </RadixAccordion.Content>
      </RadixAccordion.Item>

      {/* Step 3 */}
      <RadixAccordion.Item value="shipping" className="border-t">
        <RadixAccordion.Header className="group w-full py-8">
          {step === '3' ? (
            <p className="group-data-[state=open]:font-bold">3. Shipping</p>
          ) : (
            <div className="flex justify-between">
              <p>3. Shipping</p>

              <RadixAccordion.Trigger className="cursor-pointer underline">
                Change
              </RadixAccordion.Trigger>
            </div>
          )}
          {step !== '3' && (
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
            onPress={() => setStep('4')}
          >
            Next
          </Button>
        </RadixAccordion.Content>
      </RadixAccordion.Item>

      {/* Step 4 */}
      <RadixAccordion.Item value="payment" className="border-t">
        <RadixAccordion.Header className="group w-full py-8">
          {step === '4' ? (
            <p className="group-data-[state=open]:font-bold">4. Payment</p>
          ) : (
            <div className="flex justify-between">
              <p>4. Payment</p>

              <RadixAccordion.Trigger className="cursor-pointer underline">
                Change
              </RadixAccordion.Trigger>
            </div>
          )}
        </RadixAccordion.Header>
        <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
          <Button
            size="lg"
            iconRight={<Icon name="arrow-up" />}
            className="w-full"
          >
            Pay with stripe
          </Button>
        </RadixAccordion.Content>
      </RadixAccordion.Item>
      <LinkAsButton
        href="/confirmation"
        size="lg"
        className="mb-24 mt-8 w-full"
      >
        Place an order
      </LinkAsButton>
    </RadixAccordion.Root>
  );
});
