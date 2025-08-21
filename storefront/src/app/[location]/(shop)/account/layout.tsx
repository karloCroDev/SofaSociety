// External packages
import { redirect } from 'next/navigation';

// Components
import { Header } from '@/components/ui/header/Header';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Navigation } from '@/components/shop/account/Navigation';
import { LogoutButton } from '@/components/ui/LogoutButton';

// Lib
import { getCustomer } from '@/lib/data/auth';

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customer = await getCustomer();

  if (!customer) redirect('/login?redirect_url=/account');

  return (
    <>
      <Header />
      <Layout>
        <LayoutRow>
          <LayoutColumn lg={3} xs={12}>
            <div className="lg:fixed lg:h-[calc(100vh-88px)]">
              <div className='pulled-background-account flex h-full w-full flex-col after:absolute after:right-0 after:top-0 after:z-[-1] after:hidden after:h-full after:bg-gray-50 after:content-[""] lg:p-8 lg:pb-8 lg:pt-32 after:lg:block'>
                <div className="mt-8 hidden items-center justify-between lg:mt-0 lg:flex">
                  <h3 className="text-xl font-semibold">My account</h3>
                </div>
                <Navigation />

                <LogoutButton className="mt-auto hidden lg:block">
                  Log out
                </LogoutButton>
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
