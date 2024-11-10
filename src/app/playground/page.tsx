'use client';

import { Radio, RadioGroup } from 'react-aria-components';
// External packages

// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { Tag } from '@/components/ui/Tag';
import { Checkbox } from '@/components/ui/Checkbox';
import { RadioButtonVisual, RadioIconVisual } from '@/components/ui/Radio';

export default function Page() {
  return (
    <div className="flex flex-col items-start gap-4 p-5">
      <Icon name="package" className="text-black" />
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
    </div>
  );
}
