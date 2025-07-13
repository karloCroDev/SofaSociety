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

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordProps = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ForgotPasswordProps>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async () => {};

  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <Input inputProps={{ ...register('email') }} type="email" label="Email" />
      <Button type="submit" size="lg" className="mt-8 w-full">
        Reset password
      </Button>
    </Form>
  );
};
