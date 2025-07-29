'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';

// Hook
import { signupSchema, useSignup } from '@/hooks2/customer';

type SignUpProps = z.infer<typeof signupSchema>;

export const SignUpForm = withReactQueryProvider(() => {
  const { mutate, isPending } = useSignup();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SignUpProps>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUpProps) => {
    mutate(data, {
      onSuccess(res) {
        if (!res.error || res.state !== 'error') return reset();
        setError('root', { message: res.message });
      },
    });
  };
  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6">
        <div className="flex-1">
          <Controller
            control={control}
            name="first_name"
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                }}
                label="First name"
                id="first-name"
                name="first-name"
              />
            )}
          />

          <p className="mt-2 text-red-400">
            {errors.first_name && errors.first_name.message}
          </p>
        </div>

        <div className="flex-1">
          <Controller
            control={control}
            name="last_name"
            render={({ field }) => (
              <Input
                inputProps={{
                  ...field,
                }}
                label="Last name"
                id="last-name"
                name="last-name"
              />
            )}
          />

          <p className="mt-2 text-red-400">
            {errors.last_name && errors.last_name.message}
          </p>
        </div>
      </div>
      <div>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              inputProps={{ ...field }}
              label="Email"
              id="email"
              name="email"
            />
          )}
        />

        <p className="mt-2 text-red-400">
          {errors.email && errors.email.message}
        </p>
      </div>
      <div>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              inputProps={{
                ...field,
                type: 'password',
              }}
              label="Password"
              id="password"
              name="password"
            />
          )}
        />

        <p className="mt-2 text-red-400">
          {errors.password && errors.password.message}
        </p>
        <p className="mt-2 text-red-400">
          {errors.root && errors.root.message}
        </p>
      </div>
      <Button size="lg" disabled={isSubmitting || isPending} type="submit">
        Register
      </Button>
    </Form>
  );
});
