// Components
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/header/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header hasAnImage />
      {children}
      <Footer />
    </>
  );
}
