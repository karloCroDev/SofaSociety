// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Footer } from '@/components/ui/Footer';
import { ResetPasswordForm } from '@/components/auth/login/ResetPasswordForm';

// Lib
import { getCustomer } from '@/lib/data/customer';

export default async function ResetPasswordPage() {
  const customer = await getCustomer();

  return (
    <>
      <Layout className="mt-32 lg:mt-48">
        <LayoutRow className="justify-center">
          <LayoutColumn lg={4} className="min-h-[500px]">
            <h1 className="mb-8 text-xl font-semibold">Reset password </h1>
            {/* In layout component user will dire */}

            <ResetPasswordForm isLoggedIn={!!customer} />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
      <Footer />
    </>
  );
}
