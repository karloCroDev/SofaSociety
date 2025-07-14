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

// Lib
import { forgotPassword } from '@/lib/data/customer';
import { HttpTypes } from '@medusajs/types';

const resetPasswordLinkSchema = z
  .object({
    oldPassword: z.string().min(6).optional(), // If there is no session then nothing,
    password: z.string().min(6, 'Password must be atleast 6 charachters long'),
    repeatPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

type ResetPasswordLinkProps = z.infer<typeof resetPasswordLinkSchema>;

export const ResetPasswordForm: React.FC<{
  isLoggedIn: boolean;
}> = ({ isLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ResetPasswordLinkProps>({
    resolver: zodResolver(resetPasswordLinkSchema),
  });

  // Karlo: Try to get mail, because without token I can't do nothing
  // Karlo: get user session, if yes then give him the option

  const onSubmit = async () => {};

  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      {isLoggedIn && (
        <Input
          inputProps={{ ...register('oldPassword'), type: 'password' }}
          type="password"
          label="New password"
        />
      )}
      <Input
        inputProps={{ ...register('password'), type: 'password' }}
        type="password"
        label="New password"
      />
      <Input
        inputProps={{ ...register('repeatPassword'), type: 'password' }}
        type="password"
        label="Confirm new password"
      />
      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        disabled={isSubmitting}
      >
        Reset password
      </Button>
    </Form>
  );
};
