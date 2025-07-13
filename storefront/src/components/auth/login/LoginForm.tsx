'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';
import { useForm } from 'react-hook-form';
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
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<LoginProps>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSumbit = async (data: LoginProps) => {
    mutate(
      {
        ...data,
        redirect_url: '/',
      },
      {
        onSuccess(res) {
          if (res.success) return reset();

          setError('password', {
            // Password because that slot makes most sense (not because of connection with attribute password)
            message: res.message,
          });
        },
      }
    );
  };

  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSumbit)}>
      <div>
        <Input inputProps={{ ...register('email') }} label="Email" id="email" />
        <p className="mt-2 text-red-500">
          {errors.email && errors.email.message}
        </p>
      </div>
      <div>
        <Input
          inputProps={{ ...register('password'), type: 'password' }}
          label="Password"
          id="password"
        />
        <p className="mt-2 text-red-500">
          {errors.password && errors.password.message}
        </p>
      </div>
      <Link href="/login/forgot-password" className="text-gray-500">
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
