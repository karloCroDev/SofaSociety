'use client';

// External packages
import * as React from 'react';
import { Button as AriaButton } from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';

// Lib
import { withReactQueryProvider } from '@/lib/config/react-query';

// Hooks
import { useDeleteCartItem } from '@/hooks/cart';

export const DeleteButton: React.FC<{
  itemId: string;
}> = withReactQueryProvider(({ itemId }) => {
  const { mutate, isPending } = useDeleteCartItem();
  return (
    <AriaButton
      onPress={() =>
        mutate({
          lineItemId: itemId,
        })
      }
      isDisabled={isPending}
      className="mb-3 ml-auto mt-auto cursor-pointer outline-none"
    >
      <Icon name="bin" />
    </AriaButton>
  );
});
