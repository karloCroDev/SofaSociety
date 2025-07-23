// Components
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/header/Header';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
