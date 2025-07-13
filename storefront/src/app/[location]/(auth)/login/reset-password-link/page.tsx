// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Footer } from '@/components/ui/Footer';
import { ResetPasswordLinkForm } from '@/components/auth/login/ResetPasswordLinkForm';

export default async function ResetPasswordPage() {
  return (
    <>
      <Layout className="mt-32 lg:mt-48">
        <LayoutRow className="justify-center">
          {/* TODO: Na liniji ispod si malo zakomplicira stvari sa ovom visinom, ne mora nužno biti 100vh. Neka visina ovisi o sadrzaju, stavi samo neki min-height. FIXED */}
          <LayoutColumn lg={4} className="min-h-[500px]">
            <h1 className="mb-8 text-xl font-semibold">Reset password </h1>
            <ResetPasswordLinkForm />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
      <Footer />
    </>
  );
}
