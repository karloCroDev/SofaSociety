'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Dialog } from '@/components/shop/account/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const DialogResetPassword = () => (
  <Dialog
    title="Personal information"
    triggerChildren={
      <Button
        variant="outline"
        className="mt-8 w-full lg:ml-auto lg:mt-0 lg:w-auto"
      >
        Change
      </Button>
    }
  >
    <Form>
      <div className="flex gap-6">
        <Input label="First name" className="flex-1" />
        <Input label="Last name" className="flex-1" />
      </div>
      <Input label="Phone" className="mt-8" />
      <div className="mt-10 flex justify-between">
        <Button isDisabled isVisuallyDisabled type="submit">
          Save changes
        </Button>
        <Button variant="outline" slot="close">
          Cancel
        </Button>
      </div>
    </Form>
  </Dialog>
);
