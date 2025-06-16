// Components
import { HeaderWrapper } from '@/components/ui/header/HeaderWrapper';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/header/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper />
      {children}
    </>
  );
}
