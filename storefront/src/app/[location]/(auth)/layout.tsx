// External packages
import { redirect } from 'next/navigation';

// Components
import { Header } from '@/components/ui/header/Header';

// Lib
import { getCustomer } from '@/lib2/data/auth';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customer = await getCustomer();

  if (customer) redirect('/account/orders');
  return (
    <>
      <Header />
      {children}
    </>
  );
}
