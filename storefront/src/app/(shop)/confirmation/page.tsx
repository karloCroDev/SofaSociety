// TODO: Kao što sam već spomenuo na nekoj od stranica, visina stranice je problematična i layout se ne ponaša kako bi trebao na manjim visinama ekrana na desktopu. POPRAVI

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

export default function Confirmation() {
  return (
    <Layout className="mt-28 lg:mt-32">
      <LayoutRow className="justify-center">
        {/* xl:h-[calc(100vh-128px-144px-340px)] jest kod previsokih ekrana, pa da popuni visinu stranice kako footer ne bi bio napola stranice.
        128px --> visina headera s marginom (layout)
        144px --> mt foootera
        340px --> visina footera
        */}
        <LayoutColumn lg={6} className="xl:h-[calc(100vh-128px-144px-340px)]">
          <h1 className="text-3xl font-semibold">Thank you for your order!</h1>
          <p className="mt-7">
            We are pleased to confirm that your order has been successfully
            placed and will be processed shortly.
          </p>
          <p>
            {/* TODO: Na liniji ispod nemoj koristiti `<b>` već `<strong>`. FIXED*/}
            We have sent you the receipt and order details via{' '}
            <strong>e-mail.</strong>
            {/* TODO: Izbaci `<span>` sa linije ispod van paragrafa i dodaj ga ispod kao `<p>` element. FIXED*/}
          </p>
          <p>
            Your order number is <strong>#100002.</strong>
          </p>
          <div className="mt-16 flex flex-col lg:flex-row lg:justify-between">
            <div>
              <p>Shipping address:</p>
              <div className="text-gray-500">
                <p>Jovana Jeremic</p>
                <p>Duvanjska 3, 10000 Zagreb, Croatia</p>
                <p>+385 226 2266</p>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <p>Payment:</p>
              <div className="mr-8 text-gray-500">
                <p>Jovana Jerimic</p>
                <p>**** **** **** 1111</p>
                <p>Exp: 05/26</p>
              </div>
            </div>
          </div>
          <LinkAsButton href="/" className="mt-16">
            Go back to home page
          </LinkAsButton>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
