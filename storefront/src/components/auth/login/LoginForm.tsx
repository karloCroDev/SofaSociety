'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';
import { useLogin, loginFormSchema } from '@/hooks/customer';

type LoginProps = z.infer<typeof loginFormSchema>;

export const LoginForm = withReactQueryProvider(() => {
  const { isPending, mutate } = useLogin();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm<LoginProps>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginProps) => {
    mutate(
      {
        ...data,
        redirect_url: '/',
      },
      {
        onSuccess(res) {
          if (res.success) return reset();

          setError('root', {
            message: res.message,
          });
        },
      }
    );
  };

  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              inputProps={{ ...field, type: 'email' }}
              label="Email"
              id="email"
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
              inputProps={{ ...field, type: 'password' }}
              label="Password"
              id="password"
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
      <Link
        href="/login/forgot-password"
        className="-mt-4 text-gray-500 underline-offset-4 hover:underline"
      >
        Forgot Password?
      </Link>
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isPending || isSubmitting}
      >
        Log in
      </Button>
    </Form>
  );
});
