'use client';

// External packages
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpTypes } from '@medusajs/types';
import { z } from 'zod';
import { OverlayTriggerStateContext } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { CountrySelect } from '@/components/checkout/CountrySelect';
import { Input } from '@/components/ui/Input';
import { Form } from '@/components/ui/Form';

// Hooks
import { customerAddressSchema, useAddressMutation } from '@/hooks/customer';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';

type CustomerAddressSchemaProps = z.infer<typeof customerAddressSchema>;

export const AddAddressForm: React.FC<{
  userRegion?: HttpTypes.StoreRegion;
  regions?: HttpTypes.StoreRegion[];
  address?: HttpTypes.StoreCustomerAddress;
}> = withReactQueryProvider(({ regions, userRegion, address }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
    control,
    setValue,
  } = useForm<CustomerAddressSchemaProps>({
    resolver: zodResolver(customerAddressSchema),
    defaultValues: {
      first_name: address?.first_name ?? '',
      last_name: address?.last_name ?? '',
      phone: address?.phone ?? '',
      address_1: address?.address_1 ?? '',
      address_2: address?.address_2 ?? '',
      postal_code: address?.postal_code ?? '',
      city: address?.city ?? '',
      country_code: address?.country_code ?? '',
    },
  });
  const { close } = React.useContext(OverlayTriggerStateContext)!;
  console.log(address?.country_code);
  const { isPending, mutate } = useAddressMutation(address?.id);

  const onSubmit = (values: CustomerAddressSchemaProps) => {
    mutate(values, {
      onSuccess: (res) => {
        console.log(res.success);
        if (res.success) {
          close();
        }
      },
      onError: (error) => {
        console.error(error);
        setError('root', { message: error.message });
      },
    });

    console.log(values);
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

        <div className="flex gap-8">
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
          isDisabled={!isDirty || isPending || isSubmitting}
          isVisuallyDisabled={!isDirty || isPending || isSubmitting}
          type="submit"
        >
          Save changes
        </Button>
        <Button variant="outline" onPress={close}>
          Cancel
        </Button>
      </div>

      {errors.root && (
        <p className="mt-4 text-red-400">{errors.root.message}</p>
      )}
    </Form>
  );
});
