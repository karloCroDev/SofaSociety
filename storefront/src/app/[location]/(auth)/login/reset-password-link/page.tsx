// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Footer } from '@/components/ui/Footer';
import { ResetPasswordLinkForm } from '@/components/auth/login/ResetPasswordLinkForm';

export default function ResetPasswordPage() {
  return (
    <>
      <Layout className="mt-32 lg:mt-48">
        <LayoutRow className="justify-center">
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
