'use client';

// Extenral packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const SignUpForm = () => {
  return (
    <Form className="flex flex-col gap-8">
      <div className="flex gap-6">
        <Input label="First name" />
        <Input label="Last name" />
      </div>
      <Input label="Email" />
      <Input label="Password" />
      <Button size="lg">Register</Button>
    </Form>
  );
};
