'use client';

// External packages
import {
  DialogTrigger,
  Form,
  Heading,
  Radio,
  RadioGroup,
} from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { IconButton } from '@/components/ui/IconButton';
import { Tag } from '@/components/ui/Tag';
import { RadioButtonVisual, RadioIconVisual } from '@/components/ui/Radio';
import { Input } from '@/components/ui/Input';
import { Layout, LayoutRow } from '@/components/ui/Layout';
import { AnchorAsButton } from '@/components/ui/AnchorAsButton';
import { Dialog } from '@/components/shop/account/Dialog';
import { ProductsSkeletonMapping } from '@/components/ui/ProductsGrid';
import { ProductCarousel } from '@/components/shop/product/ProductCarousel';

export default function Page() {
  return (
    <>
      {/* <ProductCarousel /> */}
      <Layout>
        <div className="flex flex-col items-start gap-4">
          <Icon name="search" className="text-black" />
          <Button variant="outline" colorScheme="black" className="italic">
            Label
          </Button>
          <LinkAsButton href="/shop">Hello world</LinkAsButton>
          <IconButton>
            <Icon name="arrow" className="rotate-180" />
          </IconButton>
          <Tag> Hello world</Tag>

          <RadioGroup className="flex flex-col gap-1">
            <Radio value="1" className="group">
              <RadioIconVisual />
            </Radio>
            <Radio value="2" className="group">
              <RadioIconVisual />
            </Radio>
          </RadioGroup>
          <RadioGroup className="flex flex-col gap-1">
            <Radio value="1" className="group">
              <RadioButtonVisual additionalLabel="50$">Icon</RadioButtonVisual>
            </Radio>
            <Radio value="2" className="group">
              <RadioButtonVisual additionalLabel="50%">Icon</RadioButtonVisual>
            </Radio>
          </RadioGroup>
          <Form>
            <Input
              label="Email"
              inputProps={{
                type: 'email',
                required: true,
              }}
              name="email"
            />
            <Input
              label="Password"
              inputProps={{
                type: 'password',
                required: true,
              }}
              name="email"
            />
            <Button className="mt-4">Submit</Button>
          </Form>
          <AnchorAsButton
            href="https://nextjs.org/docs/pages/api-reference/components/link"
            target="_blank"
          >
            Hello world
          </AnchorAsButton>
        </div>
        <Dialog title="Address" triggerChildren={<Button>Test</Button>}>
          <Input label="Hello world" />
          <Input label="Hello world" />
          <Button slot="close" style={{ marginTop: 8 }}>
            Submit
          </Button>
        </Dialog>
        <LayoutRow>
          <ProductsSkeletonMapping />
        </LayoutRow>
      </Layout>
    </>
  );
}
