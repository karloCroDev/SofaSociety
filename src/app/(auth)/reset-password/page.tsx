// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { Footer } from '@/components/ui/Footer';
import { ResetPasswordForm } from '@/components/auth/reset-password/ResetPasswordForm';

export default async function ResetPassword() {
  return (
    <>
      <Layout className="mt-32 lg:mt-48">
        <LayoutRow className="justify-center">
          <LayoutColumn lg={4} className="xl:h-[calc(100vh-192px-144px-340px)]">
            <h1 className="mb-8 text-xl font-semibold">Reset password </h1>
            <ResetPasswordForm />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
      <Footer />
    </>
  );
}
