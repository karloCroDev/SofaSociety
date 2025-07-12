'use client';

// External packages
import * as React from 'react';
import { Button, ButtonProps } from 'react-aria-components';

// Hooks
import { useSignout } from '@/hooks/customer';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';
import { useCountryCode } from '@/hooks/country-code';
import { twMerge } from 'tailwind-merge';

export const LogoutButton: React.FC<
  React.ComponentPropsWithoutRef<'button'> & ButtonProps
> = withReactQueryProvider(({ children, className, ...rest }) => {
  const countryCode = useCountryCode();

  const { mutateAsync, isPending } = useSignout();

  const handleSignout = async () => {
    if (!countryCode) return;
    await mutateAsync(countryCode);
  };
  return (
    <Button
      {...rest}
      className={twMerge('w-fit outline-none', className)}
      isDisabled={isPending}
      onPress={handleSignout}
    >
      {children}
    </Button>
  );
});
