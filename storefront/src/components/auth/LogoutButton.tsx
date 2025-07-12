'use client';

// External packages
import * as React from 'react';
import { Button, ButtonProps } from 'react-aria-components';

// Hooks
import { useSignout } from '@/hooks/customer';

// Lib
import { withReactQueryProvider } from '@/lib/util/react-query';
import { useCountryCode } from '@/hooks/country-code';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export const LogoutButton: React.FC<
  React.ComponentPropsWithoutRef<'button'> & ButtonProps
> = withReactQueryProvider(({ children, className, ...rest }) => {
  const countryCode = useCountryCode();

  const { mutateAsync, isPending, error } = useSignout();

  // Karlo: Validate seesion, then try wihtout router
  const router = useRouter();

  const handleSignout = async () => {
    if (!countryCode) return;
    const xxx = await mutateAsync(countryCode);

    console.log(xxx);
    if (!error) router.push('/login');
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
