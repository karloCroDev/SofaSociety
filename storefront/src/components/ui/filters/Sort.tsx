'use client';

// External packages
import * as React from 'react';
import { Radio, RadioGroup } from 'react-aria-components';

// Components
import { RadioIconVisual } from '@/components/ui/Radio';

// Hooks
import { useSetUrlParams } from '@/hooks/useSetUrlParams';

export type SortOptions = 'price_asc' | 'price_desc' | 'created_at';

export const Sort: React.FC<{
  sort?: SortOptions;
}> = ({ sort }) => {
  const setUrlParams = useSetUrlParams();
  return (
    <>
      <RadioGroup
        className="hidden flex-col gap-8 lg:flex"
        defaultValue={sort ?? 'created_at'}
        onChange={(val) => setUrlParams('sortBy', val)}
      >
        <Radio value="created_at" className="data-[selected]:font-bold">
          Newest
        </Radio>
        <Radio value="price_desc" className="data-[selected]:font-bold">
          Highest price
        </Radio>
        <Radio value="price_asc" className="data-[selected]:font-bold">
          Lowest price
        </Radio>
      </RadioGroup>
      <RadioGroup
        className="flex flex-col gap-8 lg:hidden"
        defaultValue="featured"
      >
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
};
