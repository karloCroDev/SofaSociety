// Components
import { HeaderWrapper } from '@/components/ui/header/HeaderWrapper';
import { Footer } from '@/components/ui/Footer';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper />
      {children}
      <Footer />
    </>
  );
}
