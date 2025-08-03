'use client';

// External packages
import * as React from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { useDeleteCustomerAddress } from '@/hooks2/user-settings';
import { withReactQueryProvider } from '@/lib2/react-query';

export const DeleteAddressForm: React.FC<{
  addressId: string;
}> = withReactQueryProvider(({ addressId }) => {
  const { close } = React.useContext(OverlayTriggerStateContext)!;

  const { mutate, isPending } = useDeleteCustomerAddress(addressId);
  return (
    <>
      <div className="mx-auto mt-8 flex w-fit justify-between gap-6">
        <Button
          isDisabled={isPending}
          isVisuallyDisabled={isPending}
          onPress={() => {
            mutate();
          }}
        >
          Confirm
        </Button>
        <Button variant="outline" onPress={close}>
          Cancel
        </Button>
      </div>
    </>
  );
});
