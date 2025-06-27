// Components
import { HeaderWrapper } from '@/components/ui/header/HeaderWrapper';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/header/Header';
import { getCustomer } from '@/lib/data/customer';
import { redirect } from 'next/navigation';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customer = await getCustomer();

  if (customer) redirect('/account/orders');
  return (
    <>
      <HeaderWrapper />
      {children}
    </>
  );
}
