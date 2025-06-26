'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';
import { useLogin } from '@/hooks/customer';

export const LoginForm = withReactQueryProvider(() => {
  const { isPending, data, mutate } = useLogin();

  const handleLogin = async (formData: FormData) => {
    const rawFormData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    1;
    const { email, password } = rawFormData;

    mutate({
      email,
      password,
      redirect_url: `/shop`,
    });
  };
  return (
    <Form className="flex flex-col gap-8" action={handleLogin}>
      <Input isRequired label="Email" id="email" />
      <Input isRequired type="password" label="Password" id="password" />
      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        Log in
      </Button>
    </Form>
  );
});
