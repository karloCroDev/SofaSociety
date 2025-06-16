'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const ResetPasswordForm = () => {
  return (
    <Form className="flex flex-col gap-8">
      <Input isRequired label="Current password" />
      <Input isRequired type="password" label="New password" />
      <Input isRequired type="password" label="Confirm new password" />
      <Button type="submit" size="lg" className="mt-8 w-full" isDisabled>
        Reset password
      </Button>
    </Form>
  );
};
