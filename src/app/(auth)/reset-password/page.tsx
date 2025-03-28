// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
// TODO: Na liniji ispod si importao komponentu koja se ne koristi. Istu stvar radiš i na dosta drugih mjesta po projektu.
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Footer } from '@/components/ui/Footer';
import { ResetPasswordForm } from '@/components/auth/reset-password/ResetPasswordForm';

export default async function ResetPassword() {
  return (
    <>
      <Layout className="mt-32 lg:mt-48">
        <LayoutRow className="justify-center">
          {/* TODO: Na liniji ispod si malo zakomplicira stvari sa ovom visinom, ne mora nužno biti 100vh. Neka visina ovisi o sadrzaju, stavi samo neki min-height. */}
          <LayoutColumn lg={4} className="xl:h-[calc(100vh-192px-144px-340px)]">
            <h1 className="mb-8 text-xl font-semibold">Reset password </h1>
            {/* TODO: Ako `<Form` komponentu exportaš iz `src/components/ui/Form.tsx` onda nećeš imat potrebu za odvojenom komponentom za formu na liniji ispod. U tom slučaju ćeš moć prebacit formu direktno na page. */}
            <ResetPasswordForm />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
      <Footer />
    </>
  );
}
