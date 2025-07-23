'use client';

// External packages
import * as React from 'react';

// Components
import { Icon } from '@/components/ui/Icon';
import { Button as AriaButton } from 'react-aria-components';
import { useDeleteLineItem } from '@/hooks/cart';
import { withReactQueryProvider } from '@/lib/util/react-query';

export const DeleteButton: React.FC<{
  itemId: string;
}> = withReactQueryProvider(({ itemId }) => {
  const { mutate, isPending } = useDeleteLineItem();
  return (
    <AriaButton
      onPress={() =>
        mutate({
          lineId: itemId,
        })
      }
      isDisabled={isPending}
      className="mb-3 ml-auto mt-auto cursor-pointer outline-none"
    >
      <Icon name="bin" />
    </AriaButton>
  );
});
