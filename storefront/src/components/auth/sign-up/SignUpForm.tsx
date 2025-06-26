'use client';

// Extenral packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useSignup } from '@/hooks/customer';
import { withReactQueryProvider } from '@/lib/util/react-query';

export const SignUpForm = withReactQueryProvider(() => {
  // const { mutateAsync, isPending, data } = useSignup();

  const handleSignUp = async (formData: FormData) => {
    const rawFormData = {
      first_name: formData.get('first-name') as string,
      last_name: formData.get('last-name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // const res = await mutateAsync(rawFormData);

    console.log(rawFormData);
  };
  return (
    <Form
      className="flex flex-col gap-8"
      onSubmit={(e) => {
        e.preventDefault(); // Needed to prevent default browser form submission
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        handleSignUp(formData);
      }}
    >
      <div className="flex gap-6">
        <Input
          isRequired
          label="First name"
          id="first-name"
          name="first-name"
        />
        <Input isRequired label="Last name" id="last-name" name="last-name" />
      </div>
      <Input isRequired label="Email" id="email" name="email" />
      <Input
        isRequired
        label="Password"
        id="password"
        name="password"
        type="password"
      />
      <Button size="lg">Register</Button>
    </Form>
  );
});
