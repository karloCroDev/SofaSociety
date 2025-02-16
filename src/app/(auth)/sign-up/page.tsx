// External packages
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { SignUpForm } from '@/components/auth/sign-up/SignUpForm';

// Assets
import ImageSignUpHero from '@/public/images/auth/sign-up-hero.png';

export default function SignUp() {
  return (
    <Layout>
      <LayoutRow className="mt-22 h-[calc(100vh-88px)]">
        <Image
          src={ImageSignUpHero}
          alt="Login hero image"
          className="h-screen-minus-navbar absolute bottom-0 left-0 hidden w-1/2 object-cover lg:block"
        />
        <LayoutColumn
          lgOffset={7}
          lg={4}
          xs={12}
          className="h-screen-minus-navbar flex items-center justify-center"
        >
          <div className="flex w-full flex-col gap-6">
            <h1 className="mb-10 text-3xl font-semibold">
              Welcome back to Sofa Society!
            </h1>
            <SignUpForm />
            <p className="mt-16 text-gray-400">
              Already have an account? No worries, just{' '}
              <Link
                className="text-gray-900 underline underline-offset-4"
                href="/login"
              >
                log in.
              </Link>
            </p>
          </div>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
