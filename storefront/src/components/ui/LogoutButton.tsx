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
import { useLogout } from '@/hooks2/auth';

// Lib
import { withReactQueryProvider } from '@/lib2/config/react-query';

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
    const { mutate, isPending } = useLogout();

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
