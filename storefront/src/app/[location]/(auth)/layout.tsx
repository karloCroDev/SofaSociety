// External packages
import { redirect } from 'next/navigation';

// Components
import { HeaderWrapper } from '@/components/ui/header/HeaderWrapper';

// Lib
import { getCustomer } from '@/lib/data/customer';

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
