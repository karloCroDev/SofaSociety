'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Dialog } from '@/components/shop/account/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CountrySelect } from '@/components/shop/account/personal-and-security/CountrySelect';

export const DialogPersonalAddress = () => (
  <Dialog
    title="Add address"
    triggerChildren={<Button variant="outline">Change</Button>}
  >
    <Form>
      <div className="flex flex-col gap-8">
        <CountrySelect />
        <Input isRequired label="Address" />
        <Input isRequired label="Phone" />
        <Input label="Apartment, suite, etc. (Optional)" />
        <div className="flex gap-8">
          <Input isRequired label="Postal code" className="flex-1" />
          <Input isRequired label="City" className="flex-1" />
        </div>
      </div>
      <div className="mt-10 flex justify-between">
        <Button isDisabled isVisuallyDisabled type="submit">
          Add address
        </Button>
        <Button variant="outline" slot="close">
          Cancel
        </Button>
      </div>
    </Form>
  </Dialog>
);
