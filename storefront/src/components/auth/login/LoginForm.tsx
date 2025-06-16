'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const LoginForm = () => {
  return (
    <Form className="flex flex-col gap-8">
      <Input isRequired label="Email" />
      <Input isRequired type="password" label="Password" />
      <Button type="submit" size="lg" className="w-full">
        Log in
      </Button>
    </Form>
  );
};
