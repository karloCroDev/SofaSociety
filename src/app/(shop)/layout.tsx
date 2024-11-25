// Components
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header colorScheme="dark" />
      {children}
      <Footer />
    </>
  );
}
