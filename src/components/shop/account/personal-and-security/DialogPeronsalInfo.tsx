// TODO: Kao što sam već spomenuo, ako se riješiš ovoga `Form` cijela ova komponenta će biti server-side i moći ćeš sve ovo ubaciti direktno na `page.tsx`.

'use client';

// External packages
import * as React from 'react';
import { Form } from 'react-aria-components';

// Components
import { Dialog } from '@/components/shop/account/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const DialogPeronsalInfo = () => (
  <Dialog
    title="Personal information"
    triggerChildren={
      // TODO: Ovaj `Change` botun mi pari puno veći nego bi triba bit na `/account/personal-and-security` stranici. FIXED
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
