// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const Footer = () => (
  <div className="mt-24 bg-gray-50 lg:mt-36">
    <Layout>
      <LayoutRow className="flex-col items-center py-8 lg:h-85 lg:flex-row lg:justify-between">
        <LayoutColumn
          xs={12}
          lg={2}
          className="order-1 mt-8 lg:-order-none lg:mt-0"
        >
          <p className="text-xl font-medium leading-12 lg:text-3xl">
            Sofa <br />
            Society <br />
            Co.
          </p>
          <p className="mt-6 lg:mt-16">
            © {new Date().getFullYear()}, Sofa Society
          </p>
        </LayoutColumn>
        <LayoutColumn
          className="order-1 mt-16 flex gap-16 lg:order-none lg:mt-0"
          xs={12}
          lg={4}
        >
          <ul className="flex flex-col gap-4">
            <li>FAQ</li>
            <li>Help</li>
            <li>Delivery</li>
            <li>Returns</li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>Instagram</li>
            <li>TikTok</li>
            <li>Pinterest</li>
            <li>Facebook</li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Terms of Use</li>
          </ul>
        </LayoutColumn>
        <LayoutColumn className="flex flex-col gap-4" xs={12} lg={4}>
          <div>
            <h4 className="text-xl font-medium">Join our newsletter</h4>
            <p>We will also send you our discount coupons!</p>
          </div>
          <div className="flex gap-2">
            <Input label="Your email" />
            <Button>Subscribe</Button>
          </div>
          <p className="text-sm text-gray-500">
            By subscribing you agree to with our Privacy Policy and provide
            consent to receive updates from our company.
          </p>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  </div>
);
