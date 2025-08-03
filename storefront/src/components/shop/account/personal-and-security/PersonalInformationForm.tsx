'use client';

// External packages
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { OverlayTriggerStateContext } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

// Lib
import { withReactQueryProvider } from '@/lib2/react-query';

// Hooks
import {
  updateCustomerDetailsSchema,
  useUpdateCustomer,
  UpdateCustomerDetailsArgs,
} from '@/hooks2/user-settings';

export const PersonalInformationForm: React.FC<{
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}> = withReactQueryProvider(({ firstName, lastName, phoneNumber }) => {
  const { mutate, isPending } = useUpdateCustomer();
  const { close } = React.useContext(OverlayTriggerStateContext)!;

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
    control,
  } = useForm<UpdateCustomerDetailsArgs>({
    resolver: zodResolver(updateCustomerDetailsSchema),
    defaultValues: {
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      phone: phoneNumber ?? '',
    },
  });

  const onSubmit = (data: UpdateCustomerDetailsArgs) => {
    mutate(data, {
      onSuccess: (res) => {
        if (res.state === 'success') close();
      },
      onError: (error) => {
        setError('root', { message: error.message });
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6">
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <Input label="First name" className="flex-1" inputProps={field} />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <Input label="First name" className="flex-1" inputProps={field} />
          )}
        />
      </div>

      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <Input
            label="Phone"
            className="mt-2 flex-1"
            inputProps={{
              ...field,
              value: field.value ?? '',
            }}
          />
        )}
      />

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
      {errors.root && <p className="text-red-500"> {errors.root.message}</p>}
    </Form>
  );
});
