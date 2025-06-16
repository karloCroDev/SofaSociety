// External packages
import * as React from 'react';
import Link from 'next/link';

// Components
import { Icon } from '@/components/ui/Icon';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { LanguageSelect } from '@/components/ui/header/HeaderWrapper';
import { SidebarDrawer } from '@/components/ui/header/HeaderWrapper';
import { Logo } from '@/components/ui/Logo';

export const Header = () => (
  <Layout>
    <LayoutRow className="h-22 items-center">
      <Logo />
      <LayoutColumn lgOffset={2} xlOffset={3}>
        <ul className="hidden gap-8 lg:flex">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/inspiration">Inspiration</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
        </ul>
      </LayoutColumn>
      <div className="ml-auto hidden items-center gap-8 lg:flex">
        <LanguageSelect />
        <Icon name="search" className="cursor-pointer" />
        <Link href="/">
          <Icon name="bag" />
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-8 lg:hidden">
        <Link href="/">
          <Icon name="bag" />
        </Link>
        <SidebarDrawer />
      </div>
    </LayoutRow>
  </Layout>
);
