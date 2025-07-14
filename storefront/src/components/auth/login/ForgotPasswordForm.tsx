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
import { useRouter } from 'next/navigation';

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

  const router = useRouter();
  const onSubmit = async (data: ForgotPasswordProps) => {
    const resetPasswordProposal = await forgotPassword(undefined, data);

    if (resetPasswordProposal.state === 'success') {
      router.push('/login/forgot-password/success');
      return reset();
    }

    setError('email', {
      message:
        "Uhoh that email address doesn't exists, please make sure you entered the correct email address",
    });
  };

  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          inputProps={{ ...register('email') }}
          type="email"
          label="Email"
        />
        {errors.email && (
          <p className="mt-2 text-red-400">{errors.email.message} </p>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        isDisabled={isSubmitting}
      >
        Reset password
      </Button>
    </Form>
  );
};
