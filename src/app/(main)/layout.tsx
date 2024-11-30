// Components
import { HeaderWrapper } from '@/components/ui/HeaderWrapper';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';

export default function MainLayout({
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
