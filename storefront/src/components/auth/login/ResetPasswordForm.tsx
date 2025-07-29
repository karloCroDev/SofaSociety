'use client';

// External packages
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Components
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Lib
import { resetPassword } from '@/lib2/data/auth';

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
  token: string;
  email: string;
  isLoggedIn: boolean;
}> = ({ isLoggedIn, email, token }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ResetPasswordLinkProps>({
    resolver: zodResolver(resetPasswordLinkSchema),
  });

  const [resetPasswordState, setResetPasswordAction, isPending] =
    React.useActionState(resetPassword, {
      email,
      token,
      state: 'initial',
    });

  const router = useRouter();

  const onSubmit = async ({ repeatPassword }: ResetPasswordLinkProps) => {
    React.startTransition(() => {
      setResetPasswordAction({
        newPassword: repeatPassword,
        type: isLoggedIn ? 'reset' : 'forgot',
      });

      if (resetPasswordState.state === 'error') {
        return setError('root', {
          message: resetPasswordState.message,
        });
      }

      router.push('/login');
      reset();
    });
  };

  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      {isLoggedIn && (
        <div>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <Input
                inputProps={{ ...field, type: 'password' }}
                type="password"
                label="Old password"
              />
            )}
          />

          <p className="text-red-500">
            {errors.oldPassword && errors.oldPassword.message}
          </p>
        </div>
      )}

      <div>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              inputProps={{ ...field, type: 'password' }}
              type="password"
              label="New password"
            />
          )}
        />

        <p className="text-red-500">
          {errors.password && errors.password.message}
        </p>
      </div>

      <div>
        <Controller
          control={control}
          name="repeatPassword"
          render={({ field }) => (
            <Input
              inputProps={{ ...field, type: 'password' }}
              type="password"
              label="Confirm new password"
            />
          )}
        />

        <p className="text-red-500">
          {errors.repeatPassword && errors.repeatPassword.message}
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        disabled={isSubmitting || isPending}
        isVisuallyDisabled={isSubmitting || isPending}
      >
        Reset password
      </Button>
    </Form>
  );
};
