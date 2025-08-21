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
import { resetPasswordLinkSchema, useResetPassword } from '@/hooks2/auth';
import { withReactQueryProvider } from '@/lib2/config/react-query';

type ResetPasswordFormProps = z.infer<typeof resetPasswordLinkSchema>;

export const ResetPasswordForm: React.FC<{
  token: string;
  email: string;
  isLoggedIn: boolean;
}> = withReactQueryProvider(({ isLoggedIn, email, token }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ResetPasswordFormProps>({
    resolver: zodResolver(resetPasswordLinkSchema),
  });

  const { mutate: setResetPasswordAction, isPending } = useResetPassword({
    onSuccess: ({ state, message }) => {
      if (state === 'error')
        return setError('root', {
          message: message as string,
        });

      router.push('/login');
    },
  });
  const router = useRouter();

  const onSubmit = async ({
    repeatPassword,
    password,
    oldPassword,
  }: ResetPasswordFormProps) => {
    setResetPasswordAction({
      email,
      password,
      repeatPassword,
      token,
      oldPassword,
      type: isLoggedIn ? 'reset' : 'forgot',
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
});
