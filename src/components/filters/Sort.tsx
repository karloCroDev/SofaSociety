'use client';

// External packages
import * as React from 'react';
import { Radio, RadioGroup } from 'react-aria-components';

// Components
import { RadioIconVisual } from '@/components/ui/Radio';

export const Sort = () => (
  <>
    <RadioGroup className="hidden flex-col gap-8 lg:flex">
      <Radio value="featured" className="data-[selected]:font-bold">
        Featured
      </Radio>
      <Radio value="best-selling" className="data-[selected]:font-bold">
        Best selling
      </Radio>
      <Radio value="lowest-price" className="data-[selected]:font-bold">
        Lowest price
      </Radio>
      <Radio value="highest-price" className="data-[selected]:font-bold">
        Highest price
      </Radio>
    </RadioGroup>
    <RadioGroup className="flex flex-col gap-8 lg:hidden">
      <Radio value="featured" className="group flex justify-between">
        Featured
        <RadioIconVisual />
      </Radio>
      <Radio value="best-selling" className="group flex justify-between">
        Best selling
        <RadioIconVisual />
      </Radio>
      <Radio value="lowest-price" className="group flex justify-between">
        Lowest price
        <RadioIconVisual />
      </Radio>
      <Radio value="highest-price" className="group flex justify-between">
        Highest price
        <RadioIconVisual />
      </Radio>
    </RadioGroup>
  </>
);
