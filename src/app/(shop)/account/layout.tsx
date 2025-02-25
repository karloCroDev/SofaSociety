// External packages
import Link from 'next/link';

// Components
import { Header } from '@/components/ui/header/Header';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Navigation } from '@/components/shop/account/Navigation';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Layout>
        <LayoutRow>
          <LayoutColumn lg={3} xs={12}>
            <div className="h-full lg:fixed">
              <div className='pulled-background-account flex h-full w-full flex-col after:absolute after:right-0 after:top-0 after:z-[-1] after:hidden after:h-full after:bg-gray-50 after:content-[""] lg:p-8 lg:pb-8 lg:pt-32 after:lg:block'>
                <div className="mt-8 hidden items-center justify-between lg:mt-0 lg:flex">
                  <h3 className="text-xl font-semibold">My account</h3>
                </div>
                <Navigation />
                <Link href="/" className="mt-auto hidden lg:block">
                  Log out
                </Link>
              </div>
            </div>
          </LayoutColumn>
          <LayoutColumn lg={6} lgOffset={1} xs={12} className="mt-8 lg:mt-32">
            {children}
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </>
  );
}
