'use client';

// External packages
import * as React from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';

export const DeleteAddressForm = () => {
  const { close } = React.useContext(OverlayTriggerStateContext)!;
  return (
    <>
      <div className="mx-auto mt-8 flex w-fit justify-between gap-6">
        <Button>Confirm</Button>
        <Button variant="outline" onPress={close}>
          Cancel
        </Button>
      </div>
    </>
  );
};
