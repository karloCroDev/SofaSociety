'use client';

// External packages
import * as React from 'react';
import { Radio, RadioGroup } from 'react-aria-components';

export const Sort = () => (
  <RadioGroup className="flex flex-col gap-8">
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
);
