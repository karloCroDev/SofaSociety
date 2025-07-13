'use client';

// External packages
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const resetPasswordLinkSchema = z
  .object({
    password: z.string().min(6, 'Password must be atleast 6 charachters long'),
    repeatPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

type ResetPasswordLinkProps = z.infer<typeof resetPasswordLinkSchema>;

export const ResetPasswordLinkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ResetPasswordLinkProps>({
    resolver: zodResolver(resetPasswordLinkSchema),
  });

  const onSubmit = async () => {};

  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        inputProps={{ ...register('password') }}
        type="password"
        label="New password"
      />
      <Input
        inputProps={{ ...register('repeatPassword') }}
        type="password"
        label="Confirm new password"
      />
      <Button type="submit" size="lg" className="mt-8 w-full">
        Reset password
      </Button>
    </Form>
  );
};
