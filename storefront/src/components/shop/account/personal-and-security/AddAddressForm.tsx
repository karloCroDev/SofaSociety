'use client';

// External packages
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpTypes } from '@medusajs/types';
import { OverlayTriggerStateContext } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { CountrySelect } from '@/components/checkout/CountrySelect';
import { Input } from '@/components/ui/Input';
import { Form } from '@/components/ui/Form';

// Lib
import { withReactQueryProvider } from '@/lib2/config/react-query';

// Hooks
import {
  CustomerAddressArgs,
  useUpdateAddress,
  customerAddressSchema,
  useAddAddress,
} from '@/hooks2/user-settings';

export const AddAddressForm: React.FC<{
  userRegion?: HttpTypes.StoreRegion;
  regions?: HttpTypes.StoreRegion[];
  address?: HttpTypes.StoreCustomerAddress;
}> = withReactQueryProvider(({ regions, userRegion, address }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    setError,
    control,
  } = useForm<CustomerAddressArgs>({
    resolver: zodResolver(customerAddressSchema),
    defaultValues: {
      first_name: address?.first_name ?? '',
      last_name: address?.last_name ?? '',
      phone: address?.phone ?? '',
      address_1: address?.address_1 ?? '',
      address_2: address?.address_2 ?? '',
      postal_code: address?.postal_code ?? '',
      city: address?.city ?? '',
      country_code: userRegion?.countries?.[0]?.iso_2,
    },
  });
  const { close } = React.useContext(OverlayTriggerStateContext)!;

  console.log(address?.id);
  const { isPending, mutate } = address?.id
    ? useUpdateAddress(address.id)
    : useAddAddress();

  const onSubmit = (values: CustomerAddressArgs) => {
    mutate(values, {
      onSuccess: (res) => {
        console.log(res);
        if (res.state === 'success') {
          close();
        }
      },
      onError: (error) => {
        console.log(error);
        setError('root', { message: error.message });
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8">
        <Controller
          control={control}
          name="country_code"
          render={({ field }) => (
            <CountrySelect
              regions={regions}
              userRegion={userRegion}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <Controller
            control={control}
            name="first_name"
            render={({ field }) => (
              <Input label="First name" className="flex-1" inputProps={field} />
            )}
          />
          <Controller
            control={control}
            name="last_name"
            render={({ field }) => (
              <Input label="Last name" className="flex-1" inputProps={field} />
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
        <Controller
          control={control}
          name="address_1"
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
          name="address_2"
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
            name="postal_code"
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
      </div>

      <div className="mt-10 flex justify-between">
        <Button
          isDisabled={!isDirty || !isValid || isPending || isSubmitting}
          isVisuallyDisabled={!isDirty || !isValid || isPending || isSubmitting}
          type="submit"
        >
          Save changes
        </Button>
        <Button variant="outline" onPress={close}>
          Cancel
        </Button>

        {errors.root && (
          <p className="mt-4 text-red-400">{errors.root.message}</p>
        )}
      </div>
    </Form>
  );
});
