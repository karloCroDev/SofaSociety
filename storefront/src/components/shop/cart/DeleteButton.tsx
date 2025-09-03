'use client';

// External packages
import * as React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { QueryClient } from '@tanstack/react-query';
import { HttpTypes } from '@medusajs/types';

// Components
import { Icon } from '@/components/ui/Icon';

// Lib
import { withReactQueryProvider } from '@/lib/config/react-query';

// Hooks
import { useDeleteCartItem } from '@/hooks/cart';

export const DeleteButton: React.FC<{
  itemId: string;
}> = withReactQueryProvider(({ itemId }) => {
  // Ante: Nezz je li ima smisla da se debouncea deletanje itema kao sa countom, jer korisnik želi odmah vidjeti promjenu kada se deletea item. Trenutno samo handleam optimistic update za svaki item zasebno (jer mi ima vise logike, a debounceam count), ali nije problem handleati i na ostalim itemima
  const queryClient = new QueryClient();
  const { mutate } = useDeleteCartItem({
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const prevCart = queryClient.getQueryData<HttpTypes.StoreCart>(['cart']);

      // optimistic update
      queryClient.setQueryData(
        ['cart'],
        (old: HttpTypes.StoreCart | undefined) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items
              ?.map((item) =>
                item.id !== newItem.lineItemId ? item : undefined
              )
              .filter(Boolean),
          };
        }
      );

      return { prevCart };
    },
    onError: (
      _err,
      _newItem,
      context
      // Je li znas zasto na context ne dobivam vrijednost
    ) => {
      const ctx = context as
        | { prevCart: HttpTypes.StoreCart | undefined }
        | undefined;
      if (ctx?.prevCart) {
        queryClient.setQueryData(['cart'], ctx.prevCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return (
    <AriaButton
      onPress={() =>
        mutate({
          lineItemId: itemId,
        })
      }
      // isDisabled={isPending}
      className="mb-3 ml-auto mt-auto cursor-pointer outline-none"
    >
      <Icon name="bin" />
    </AriaButton>
  );
});
