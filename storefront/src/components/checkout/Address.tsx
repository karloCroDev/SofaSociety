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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  customerAddressSchema,
  CustomerAddressArgs,
} from '@/hooks2/user-settings';
import { Form } from 'react-aria-components';
import { useSetShippingAddress } from '@/hooks/cart';

export const Address: React.FC<{
  cart: HttpTypes.StoreCart;
}> = ({ cart }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'address';

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    setError,
    control,
  } = useForm<CustomerAddressArgs>({
    resolver: zodResolver(customerAddressSchema),

    mode: 'onChange', // or 'all'=
    defaultValues: {
      firstName: cart?.shipping_address?.first_name,
      lastName: cart?.shipping_address?.last_name,
      phone: cart?.shipping_address?.phone,
      address1: cart?.shipping_address?.address_1,
      address2: cart?.shipping_address?.address_2,
      postalCode: cart?.shipping_address?.postal_code,
      city: cart?.shipping_address?.city,
      countryCode: cart?.shipping_address?.country_code,
    },
  });

  const { mutate, isPending } = useSetShippingAddress();

  const onSubmit = (data: CustomerAddressArgs) => {
    mutate(
      {
        shipping_address: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone || '',
          address_1: data.address1,
          //@ts-ignore
          address_2: data?.address2,
          postal_code: data.postalCode,
          city: data.city,
          country_code: data.countryCode,
        },
      },
      {
        onSuccess: (data) => {
          if (isOpen && data.success) {
            router.push(pathname + '?step=shipping', { scroll: false });
          }
        },
      }
    );
  };
  return (
    <RadixAccordion.Item value="address" className="border-t">
      <RadixAccordion.Header className="group w-full py-8">
        {!isOpen && (
          <p className="group-data-[state=open]:font-bold">
            2. Shipping address
          </p>
        )}

        {!isOpen && cart.shipping_address && (
          <>
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
          </>
        )}
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 lg:gap-8"
        >
          <div className="flex flex-col gap-8">
            <Controller
              control={control}
              name="countryCode"
              render={({ field }) => (
                <CountrySelect
                  userRegion={cart.region}
                  regions={cart.region && [cart.region]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <Input
                  label="First name"
                  className="flex-1"
                  inputProps={field}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <Input
                  label="Last name"
                  className="flex-1"
                  inputProps={field}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="address1"
            render={({ field }) => (
              <Input
                label="Address"
                className="flex-1"
                inputProps={{
                  ...field,
                  value: field.value ?? '',
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="address2"
            render={({ field }) => (
              <Input
                label="Apartment, suite, etc. (Optional)"
                className="flex-1"
                inputProps={{
                  ...field,
                  value: field.value ?? '',
                }}
              />
            )}
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <Controller
              control={control}
              name="postalCode"
              render={({ field }) => (
                <Input
                  label="Postal code"
                  className="flex-1"
                  inputProps={{
                    ...field,
                    value: field.value ?? '',
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Input
                  label="City"
                  className="flex-1"
                  inputProps={{
                    ...field,
                    value: field.value ?? '',
                  }}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input
                label="Phone"
                className="flex-1"
                inputProps={{
                  ...field,
                  value: field.value ?? '',
                  type: 'number',
                }}
              />
            )}
          />
          <Button
            size="lg"
            type="submit"
            className="mb-8 self-start"
            onPress={() => {
              router.replace(`${pathname}?step=shipping`, { scroll: false });
            }}
            isVisuallyDisabled={
              isSubmitting || isPending || !isDirty || !isValid
            }
          >
            Next
          </Button>
        </Form>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};
