// Components
import { HeaderWrapper } from '@/components/ui/header/HeaderWrapper';
import { Footer } from '@/components/ui/Footer';

// Isti oblik stanica kao i kod (main)-a, ali sam htio malo bolje organizirati pa nezz je li dobro
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
