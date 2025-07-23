// External packages
import Link from 'next/link';

// Components
import { Icon } from '@/components/ui/Icon';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import {
  HeaderWrapper,
  LanguageSelect,
} from '@/components/ui/header/HeaderWrapper';
import { SidebarDrawer } from '@/components/ui/header/HeaderWrapper';
import { Logo } from '@/components/ui/Logo';

// Lib
import { listRegions } from '@/lib/data/regions';

export type CodeCountryTypes = {
  countryName: string | undefined;
  country: string | undefined;
  numCode: string | undefined;
  id: string;
}[];

export const Header: React.FC<{
  hasAnImage?: boolean;
}> = async ({ hasAnImage = false }) => {
  const regions = await listRegions();

  console.log(regions);

  const codeCountry = regions
    .flatMap((region) =>
      region.countries?.map((country) => ({
        id: region.id,
        countryName: country.display_name,
        country: country.iso_2,
        numCode: country.num_code,
      }))
    )
    .filter((code) => code !== undefined);

  return (
    <HeaderWrapper hasAnImage={hasAnImage}>
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
            <LanguageSelect codeCountry={codeCountry} />

            <Icon name="search" className="cursor-pointer" />
            <Link href="/login">
              <Icon name="user" className="cursor-pointer" />
            </Link>
            <Link href="/cart">
              <Icon name="bag" />
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-8 lg:hidden">
            <Link href="/login">
              <Icon name="user" className="cursor-pointer" />
            </Link>
            <Link href="/cart">
              <Icon name="bag" />
            </Link>
            <SidebarDrawer codeCountry={codeCountry} />
          </div>
        </LayoutRow>
      </Layout>
    </HeaderWrapper>
  );
};
