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
import { withReactQueryProvider } from '@/lib/util/react-query';
import { updateCustomerFormSchema, useUpdateCustomer } from '@/hooks/customer';

type PersonalInformationFormProps = z.infer<typeof updateCustomerFormSchema>;

export const PersonalInformationForm: React.FC<{
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}> = withReactQueryProvider(({ firstName, lastName, phoneNumber }) => {
  const { mutate, isPending } = useUpdateCustomer();
  const { close } = React.useContext(OverlayTriggerStateContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
    control,
  } = useForm<PersonalInformationFormProps>({
    resolver: zodResolver(updateCustomerFormSchema),
    defaultValues: {
      first_name: firstName ?? '',
      last_name: lastName ?? '',
      phone: phoneNumber ?? '',
    },
  });

  const onSubmit = async (data: PersonalInformationFormProps) => {
    console.log(data);
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
          name="first_name"
          render={({ field: { value } }) => (
            <Input
              label="First name"
              className="flex-1"
              inputProps={{
                ...register('first_name'),
                value,
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="last_name"
          render={({ field: { value } }) => (
            <Input
              label="First name"
              className="flex-1"
              inputProps={{
                ...register('last_name'),

                value,
              }}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="phone"
        render={({ field: { value } }) => (
          <Input
            label="Phone"
            className="mt-2 flex-1"
            inputProps={{
              ...register('phone'),
              value: value ?? '',
              type: 'number',
            }}
          />
        )}
      />

      <div className="mt-10 flex justify-between">
        <Button
          isDisabled={!isDirty}
          isVisuallyDisabled={!isDirty}
          type="submit"
        >
          Save changes
        </Button>
        <Button variant="outline" slot="close">
          Cancel
        </Button>
      </div>
      {errors.root && <p className="text-red-500"> {errors.root.message}</p>}
    </Form>
  );
});
