// Components
import { HeaderWrapper } from '@/components/ui/header/HeaderWrapper';
import { Footer } from '@/components/ui/Footer';

// Isti oblik stanica kao i kod (main)-a, ali sam htio malo bolje organizirati pa nezz je li dobro
export default function CollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper hasAnImage />
      {children}
      <Footer />
    </>
  );
}
