'use client';

// External packages
import * as React from 'react';
import { Radio, RadioGroup } from 'react-aria-components';

// Components
import { RadioIconVisual } from '@/components/ui/Radio';

// Hooks
import { useSetUrlParams } from '@/hooks2/util/useSetUrlParams';

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
        onChange={(val) => setUrlParams('sortBy', val)}
        defaultValue={sort ?? 'created_at'}
      >
        <Radio value="created_at" className="group flex justify-between">
          Newest
          <RadioIconVisual />
        </Radio>
        <Radio value="price_desc" className="group flex justify-between">
          Highest price
          <RadioIconVisual />
        </Radio>
        <Radio value="price_asc" className="group flex justify-between">
          Lowest price
          <RadioIconVisual />
        </Radio>
      </RadioGroup>
    </>
  );
};
