'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Lib
import { withReactQueryProvider } from '@/lib2/config/react-query';
import { useLogin, loginFormSchema, LoginArgs } from '@/hooks2/auth';

export const LoginForm = withReactQueryProvider(
  ({ redirectUrl }: { redirectUrl: string | undefined }) => {
    const { isPending, mutate } = useLogin();
    const {
      handleSubmit,
      formState: { errors, isSubmitting },
      setError,
      reset,
      control,
    } = useForm<LoginArgs>({
      resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = async (data: LoginArgs) => {
      mutate(
        {
          ...data,
          redirect_url: redirectUrl || '/',
        },
        {
          onSuccess(res) {
            if (res.state === 'success') return reset();

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
          isVisuallyDisabled={isPending || isSubmitting}
        >
          Log in
        </Button>
      </Form>
    );
  }
);
