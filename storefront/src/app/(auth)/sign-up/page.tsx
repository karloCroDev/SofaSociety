// External packages
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
            {/* TODO: Ako `<Form` komponentu exportaš iz `src/components/ui/Form.tsx` onda nećeš imat potrebu za odvojenom komponentom za formu na liniji ispod. U tom slučaju ćeš moć prebacit formu direktno na page. FIXED */}
            <Form className="flex flex-col gap-8">
              <div className="flex gap-6">
                <Input isRequired label="First name" />
                <Input isRequired label="Last name" />
              </div>
              <Input isRequired label="Email" />
              <Input isRequired label="Password" />
              <Button size="lg">Register</Button>
            </Form>

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
