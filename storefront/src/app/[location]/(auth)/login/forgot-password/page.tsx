// External packages
import Image from 'next/image';
import ImageLoginHero from '@/public/images/auth/login-hero.png';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { ForgotPasswordForm } from '@/components/auth/login/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <Layout>
      <LayoutRow className="mt-22 h-[calc(100vh-88px)]">
        <Image
          src={ImageLoginHero}
          alt="Login hero image"
          className="h-screen-minus-navbar absolute bottom-0 left-0 hidden w-1/2 object-cover lg:block"
        />
        <LayoutColumn
          lgOffset={7}
          lg={4}
          xs={12}
          className="h-screen-minus-navbar flex items-center justify-center"
        >
          <div className="flex w-full flex-col gap-8">
            <h1 className="mb-10 text-3xl font-semibold">
              Forgotten password?
            </h1>
            <p>
              Enter your email address below and we will send you instructions
              on how to reset your password.
            </p>
            <ForgotPasswordForm />
          </div>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
