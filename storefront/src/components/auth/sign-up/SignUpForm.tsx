'use client';

// Extenral packages
import * as React from 'react';
import { Form } from 'react-aria-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';

// Hook
import { signupFormSchema, useSignup } from '@/hooks/customer';

type SignUpProps = z.infer<typeof signupFormSchema>;

export const SignUpForm = withReactQueryProvider(() => {
  const { mutate, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SignUpProps>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = async (data: SignUpProps) => {
    mutate(data, {
      onSuccess(res) {
        if (!res.error) return reset();
        setError('root', { message: res.error });
      },
    });
  };
  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6">
        <div className="flex-1">
          <Input
            inputProps={{
              ...register('first_name'),
            }}
            label="First name"
            id="first-name"
            name="first-name"
          />
          <p className="mt-2 text-red-400">
            {errors.first_name && errors.first_name.message}
          </p>
        </div>

        <div className="flex-1">
          <Input
            inputProps={{
              ...register('last_name'),
            }}
            label="Last name"
            id="last-name"
            name="last-name"
          />
          <p className="mt-2 text-red-400">
            {errors.last_name && errors.last_name.message}
          </p>
        </div>
      </div>
      <div>
        <Input
          inputProps={{ ...register('email') }}
          label="Email"
          id="email"
          name="email"
        />
        <p className="mt-2 text-red-400">
          {errors.email && errors.email.message}
        </p>
      </div>
      <div>
        <Input
          inputProps={{
            ...register('password'),
            type: 'password',
          }}
          label="Password"
          id="password"
          name="password"
          type="password"
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
