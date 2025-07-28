'use client';

// External packages
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, ButtonProps } from 'react-aria-components';

// Components
import {
  getButtonClassNames,
  type AdditionalButtonProps,
} from '@/components/ui/LinkAsButton';

// Hooks
import { useSignout } from '@/hooks/customer';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';

export const LogoutButton: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    ButtonProps &
    AdditionalButtonProps & {
      treatStylesLikeButton?: boolean;
    }
> = withReactQueryProvider(
  ({
    treatStylesLikeButton = false,
    colorScheme = 'black',
    variant = 'primary',
    size = 'sm',
    isVisuallyDisabled = false,
    iconLeft,
    iconRight,
    children,
    className,
    ...rest
  }) => {
    const { mutate, isPending } = useSignout();

    return (
      <Button
        {...rest}
        className={twMerge(
          treatStylesLikeButton &&
            getButtonClassNames({
              size,
              variant,
              colorScheme,
              isVisuallyDisabled,
            }),
          className
        )}
        isDisabled={isPending}
        onPress={() => mutate()}
      >
        {children}
      </Button>
    );
  }
);
