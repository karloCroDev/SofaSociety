'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { Radio, RadioGroup } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

// Components
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Input } from '@/components/ui/Input';
import { CheckboxVisually } from '@/components/ui/Checkbox';
import { CountrySelect } from '@/components/checkout/CountrySelect';

// Assets
// import ImageCardProvider from '@/public/assets/images';

export const Accordion = () => {
  const [step, setStep] = React.useState('3');

  return (
    <RadixAccordion.Root type="single" value={step} collapsible>
      <RadixAccordion.Item value="1" className="-mt-8">
        <RadixAccordion.Header className="group w-full py-8">
          {step === '1' ? (
            <p className="group-data-[state=open]:font-bold group-data-[state=open]:italic group-data-[state=open]:text-blue-700">
              1. Email
            </p>
          ) : (
            <div className="flex justify-between">
              <p className="group-data-[state=open]:text-blue-700">1. Email</p>

              <RadixAccordion.Trigger className="cursor-pointer underline">
                Change
              </RadixAccordion.Trigger>
            </div>
          )}
          {step !== '1' && (
            <div className="text-grayscale-400 pt-7 text-start text-sm">
              Email:
              <span className="text-grayscale-600 ml-16">example@test.com</span>
            </div>
          )}
        </RadixAccordion.Header>
        <RadixAccordion.Content className="data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion overflow-hidden transition-colors">
          <div className="flex flex-col gap-6 lg:gap-8">
            <Input
              label="Email"
              className="bg-red-700"
              inputProps={{
                required: true,
                type: 'email',
              }}
            />
            <div className="text-2xs text-grayscale-400 flex items-start gap-2">
              <CheckboxVisually>
                <p className="text-grayscale-400 text-xs">
                  What to get news and offers? Ok, yes and some discounts. But
                  only if you subscribe.
                </p>
              </CheckboxVisually>
            </div>

            <Button type="submit" className="mb-8" onClick={() => setStep('2')}>
              Next
            </Button>
          </div>
        </RadixAccordion.Content>
      </RadixAccordion.Item>
      <RadixAccordion.Item value="2" className="border-t">
        <RadixAccordion.Header className="group w-full py-8">
          {step === '2' ? (
            <p className="group-data-[state=open]:font-bold group-data-[state=open]:italic group-data-[state=open]:text-blue-700">
              2. Shipping address
            </p>
          ) : (
            <div className="flex justify-between">
              <p className="group-data-[state=open]:text-blue-700">
                2. Shipping address
              </p>

              <RadixAccordion.Trigger className="cursor-pointer underline">
                Change
              </RadixAccordion.Trigger>
            </div>
          )}
          {step !== '2' && (
            <div className="text-grayscale-400 pt-7 text-start text-sm">
              <div>
                Name:
                <span className="text-grayscale-600 ml-16">Ante Antic</span>
              </div>
              <div>
                Ship to:
                <span className="text-grayscale-600 ml-16">
                  Trg Bana Jelacica
                </span>
              </div>
              <div>
                Phone:
                <span className="text-grayscale-600 ml-16">+385 226 2226</span>
              </div>
            </div>
          )}
        </RadixAccordion.Header>
        <RadixAccordion.Content className="data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion overflow-hidden transition-colors">
          <div className="flex flex-col gap-6 lg:gap-8">
            <CountrySelect />
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              <Input
                label="First name"
                inputProps={{
                  required: true,
                }}
              />
              <Input
                label="Last name"
                inputProps={{
                  required: true,
                }}
              />
            </div>
            <Input
              label="Address"
              inputProps={{
                required: true,
              }}
            />
            <Input label="Apartment, suite, etc. (Optional)" />
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              <Input
                label="Postal code"
                inputProps={{
                  required: true,
                }}
              />
              <Input
                label="City"
                inputProps={{
                  required: true,
                }}
              />
            </div>
            <Input
              label="Phone"
              inputProps={{
                required: true,
              }}
            />

            <Button type="submit" className="mb-8" onClick={() => setStep('3')}>
              Next
            </Button>
          </div>
        </RadixAccordion.Content>
      </RadixAccordion.Item>
      <RadixAccordion.Item value="3" className="border-t">
        <RadixAccordion.Header className="group w-full py-8">
          {step === '3' ? (
            <p className="group-data-[state=open]:font-bold group-data-[state=open]:italic group-data-[state=open]:text-blue-700">
              3. Shipping method
            </p>
          ) : (
            <div className="flex justify-between">
              <p className="group-data-[state=open]:text-blue-700">
                3. Shipping method
              </p>

              <RadixAccordion.Trigger className="cursor-pointer underline">
                Change
              </RadixAccordion.Trigger>
            </div>
          )}
          {step !== '3' && (
            <div className="text-grayscale-400 pt-7 text-start text-sm">
              Shipping:
              <span className="text-grayscale-600 ml-16">
                Standard delivery 3-5 days
              </span>
            </div>
          )}
        </RadixAccordion.Header>
        <RadixAccordion.Content className="data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion overflow-hidden transition-colors">
          <RadioGroup defaultValue="Standard delivery">
            <Radio
              value="Standard delivery"
              className="border-grayscale-200 group flex h-16 w-full cursor-pointer items-center gap-3 rounded-sm border px-4 transition-colors duration-300 hover:border-blue-700"
            >
              {/* TODO: Napravit UI komponentu za radio ikonu. Y */}
              <IconAsRadio />
              Standard delivery
              <div className="ml-auto flex items-center gap-4">
                <p>€45</p>
              </div>
            </Radio>
            <Radio
              value="Fast delivery"
              className="border-grayscale-200 group mt-2 flex h-16 w-full cursor-pointer items-center gap-3 rounded-sm border px-4 transition-colors duration-300 hover:border-blue-700"
            >
              <IconAsRadio />
              Standard delivery
              <div className="ml-auto flex items-center gap-4">
                <p>€45</p>
              </div>
            </Radio>
          </RadioGroup>
          <Button type="submit" className="my-8" onClick={() => setStep('4')}>
            Next
          </Button>
        </RadixAccordion.Content>
      </RadixAccordion.Item>

      {/* Step 4 */}

      <RadixAccordion.Item value="4" className="border-t">
        <RadixAccordion.Header className="group w-full py-8">
          {step === '4' ? (
            <p className="group-data-[state=open]:font-bold group-data-[state=open]:italic group-data-[state=open]:text-blue-700">
              4. Payment
            </p>
          ) : (
            <div className="flex justify-between">
              <p className="group-data-[state=open]:text-blue-700">
                4. Payment
              </p>

              <RadixAccordion.Trigger className="cursor-pointer underline">
                Change
              </RadixAccordion.Trigger>
            </div>
          )}
        </RadixAccordion.Header>
        <RadixAccordion.Content className="data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion overflow-hidden transition-colors">
          <RadixAccordion.Root type="single" defaultValue="google" collapsible>
            {/* TODO: Napravit da je razmak isti kako bi se izbjega skok. Y*/}
            <RadixAccordion.Item value="Card1">
              <RadixAccordion.Trigger className="group mt-2 flex w-full items-center justify-between">
                <div className="border-grayscale-200 group flex h-16 w-full cursor-pointer items-center gap-3 rounded-sm border px-4 transition-colors duration-300 hover:border-blue-700">
                  <IconAsRadio isRadioSelector={false} />
                  Card
                  <div className="ml-auto flex items-center gap-4">
                    <div className="h-6 w-9">
                      {/* <Image
                        src={ImageCardProvider}
                        alt="Credit card provider"
                      /> */}
                    </div>
                  </div>
                </div>
              </RadixAccordion.Trigger>
              <RadixAccordion.Content className="data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion overflow-hidden transition-colors">
                <div className="border-grayscale-200 flex flex-col gap-6 border border-t-0 p-4 lg:gap-8">
                  <Input
                    label="Name on card"
                    inputProps={{
                      className: 'rounded',
                      required: true,
                    }}
                  />
                  <Input
                    label="Card number"
                    inputProps={{
                      className: 'rounded',
                      required: true,
                    }}
                  />
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-4">
                    <Input
                      label="First name"
                      inputProps={{
                        className: 'rounded',
                        required: true,
                      }}
                    />
                    <Input
                      label="Last name"
                      inputProps={{
                        className: 'rounded',
                        required: true,
                      }}
                    />
                  </div>
                  <CheckboxVisually className="text-grayscale-400 text-xs lg:-mt-4">
                    Save card details for next time
                  </CheckboxVisually>
                  <Button type="submit">Use card</Button>
                </div>
              </RadixAccordion.Content>
            </RadixAccordion.Item>

            <RadixAccordion.Item value="Card2">
              <RadixAccordion.Trigger className="group mt-2 flex w-full items-center justify-between">
                <div className="border-grayscale-200 group flex h-16 w-full cursor-pointer items-center gap-3 rounded-sm border px-4 transition-colors duration-300 hover:border-blue-700">
                  <IconAsRadio isRadioSelector={false} />
                  Card
                  <div className="ml-auto flex items-center gap-4">
                    <div className="h-6 w-9">
                      {/* <Image
                        src={ImageCardProvider}
                        alt="Credit card provider"
                      /> */}
                    </div>
                  </div>
                </div>
              </RadixAccordion.Trigger>
              <RadixAccordion.Content className="data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion overflow-hidden transition-colors">
                <div className="border-grayscale-200 flex flex-col gap-6 border border-t-0 p-4 lg:gap-8">
                  <Input
                    label="Name on card"
                    inputProps={{
                      className: 'rounded',
                      required: true,
                    }}
                  />
                  <Input
                    label="Card number"
                    inputProps={{
                      className: 'rounded',
                      required: true,
                    }}
                  />
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-4">
                    <Input
                      label="First name"
                      inputProps={{
                        className: 'rounded',
                        required: true,
                      }}
                    />
                    <Input
                      label="Last name"
                      inputProps={{
                        className: 'rounded',
                        required: true,
                      }}
                    />
                  </div>
                  <CheckboxVisually className="text-grayscale-400 text-xs lg:-mt-4">
                    Save card details for next time
                  </CheckboxVisually>
                  <Button type="submit">Use card</Button>
                </div>
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          </RadixAccordion.Root>
        </RadixAccordion.Content>
      </RadixAccordion.Item>
      <LinkAsButton href="/confirmation" className="mb-24 mt-8 w-full">
        Place an order
      </LinkAsButton>
    </RadixAccordion.Root>
  );
};

const IconAsRadio: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    isRadioSelector?: boolean;
  }
> = ({ isRadioSelector = true, className, ...rest }) => (
  <div
    {...rest}
    className={twMerge(
      'border-grayscale-900 bg-grayscale-10 h-4 w-4 cursor-pointer rounded-full border transition-[border] duration-300 group-hover:border-blue-700',
      isRadioSelector
        ? 'group-data-[selected]:border-6'
        : 'group-data-[state=open]:border-6',
      className
    )}
  />
);
