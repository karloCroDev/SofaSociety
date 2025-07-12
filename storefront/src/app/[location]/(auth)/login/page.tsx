'use client';

// External packages
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Input } from '@/components/ui/Input';
import { Form } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';

// Assets
import ImageLoginHero from '@/public/images/auth/login-hero.png';
import { LoginForm } from '@/components/auth/login/LoginForm';

// Hooks
import { useLogin } from '@/hooks/customer';

export default function Login() {
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
          <div className="flex w-full flex-col gap-6">
            <h1 className="mb-10 text-3xl font-semibold">
              Welcome back to Sofa Society!
            </h1>
            {/* TODO: Ako `<Form` komponentu exportaš iz `src/components/ui/Form.tsx` onda nećeš imat potrebu za odvojenom komponentom za formu na liniji ispod. U tom slučaju ćeš moć prebacit formu direktno na page. FIXED*/}

            <LoginForm />
            {/* <Form className="flex flex-col gap-8">
              <Input isRequired label="Email" id="email" />
              <Input
                isRequired
                type="password"
                label="Password"
                id="password"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full"
                // onSubmit={() => console.log('Hello world')}
              >
                Log in
              </Button>
            </Form> */}

            <p className="mt-16 text-gray-400">
              Don’t have an account yet? You can{' '}
              <Link
                className="text-gray-900 underline underline-offset-4"
                href="/sign-up"
              >
                register here.
              </Link>
            </p>
          </div>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
