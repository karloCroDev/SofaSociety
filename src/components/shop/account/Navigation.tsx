'use client';

// External packages
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Navigation = () => {
  const path = usePathname();

  return (
    <div className="mt-16 flex flex-col gap-8">
      <Link
        href="/account/orders"
        className={path.includes('/orders') ? 'font-bold' : undefined}
      >
        Personal and securtiy
      </Link>
      <Link
        href="/account/personal-and-security"
        className={
          path.includes('/personal-and-security') ? 'font-bold' : undefined
        }
      >
        My orders
      </Link>
    </div>
  );
};
