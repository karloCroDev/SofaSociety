// Components
import { HeaderWrapper } from '@/components/ui/HeaderWrapper';
import { Footer } from '@/components/ui/Footer';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper colorScheme="dark" />
      {children}
      <Footer />
    </>
  );
}
