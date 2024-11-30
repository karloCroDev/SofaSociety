'use client';

// External packages
import { Form, Radio, RadioGroup } from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { Tag } from '@/components/ui/Tag';
import { Checkbox } from '@/components/ui/Checkbox';
import { RadioButtonVisual, RadioIconVisual } from '@/components/ui/Radio';
import { Input } from '@/components/ui/Input';
import { Layout } from '@/components/ui/Layout';
import { AnchorAsButton } from '@/components/ui/AnchorAsButton';

export default function Page() {
  return (
    <Layout>
      <div className="flex flex-col items-start gap-4">
        <Icon name="search" className="text-black" />
        <Button variant="outline" colorScheme="black" className="italic">
          Label
        </Button>
        <LinkAsButton href="/shop" size="sm">
          Hello world
        </LinkAsButton>
        <ArrowButton direction="right" />
        <Tag> Hello world</Tag>
        <Checkbox className="block" />
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
    </Layout>
  );
}
