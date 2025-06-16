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
        <Input isRequired label="First name" />
        <Input isRequired label="Last name" />
      </div>
      <Input isRequired label="Email" />
      <Input isRequired label="Password" />
      <Button size="lg">Register</Button>
    </Form>
  );
};
