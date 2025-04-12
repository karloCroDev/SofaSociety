// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';
import { Form } from '@/components/ui/Form';

// TODO: Na liniji ispod si importao komponentu koja se ne koristi. Istu stvar radiš i na dosta drugih mjesta po projektu. PROVJERI!!!
import { Input } from '@/components/ui/Input';
import { Footer } from '@/components/ui/Footer';
import { Button } from '@/components/ui/Button';

export default async function ResetPassword() {
  return (
    <>
      <Layout className="mt-32 lg:mt-48">
        <LayoutRow className="justify-center">
          {/* TODO: Na liniji ispod si malo zakomplicira stvari sa ovom visinom, ne mora nužno biti 100vh. Neka visina ovisi o sadrzaju, stavi samo neki min-height. */}
          <LayoutColumn lg={4} className="min-h-[500px]">
            <h1 className="mb-8 text-xl font-semibold">Reset password </h1>
            <Form className="flex flex-col gap-8">
              <Input isRequired label="Current password" />
              <Input isRequired type="password" label="New password" />
              <Input isRequired type="password" label="Confirm new password" />
              <Button
                type="submit"
                size="lg"
                className="mt-8 w-full"
                isDisabled
              >
                Reset password
              </Button>
            </Form>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
      <Footer />
    </>
  );
}
