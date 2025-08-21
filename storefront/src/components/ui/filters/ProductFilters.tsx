'use client';

// External packages
import * as React from 'react';
import { CheckboxGroup } from 'react-aria-components';

// Components
import { CheckboxWithLabel } from '@/components/ui/Checkbox';

// Hooks
import {
  useSetUrlParams,
  type UrlParamsProps,
} from '@/hooks2/util/country-code';
import { HttpTypes } from '@medusajs/types';

export const ProductFilters: React.FC<{
  productFilters?: string[];
  appliedProductFilters?: {
    handle: string;
    name: string;
    id: string;
  }[];
  type: UrlParamsProps;
}> = ({ productFilters, appliedProductFilters, type }) => {
  const setUrlParams = useSetUrlParams();
  return (
    <CheckboxGroup
      className="flex flex-col gap-8"
      onChange={(val) => {
        setUrlParams(type, val);
      }}
      value={productFilters ?? []}
    >
      {Array.isArray(appliedProductFilters) &&
        appliedProductFilters.map((collection) => (
          <CheckboxWithLabel value={collection?.handle} key={collection.id}>
            {collection.name}
          </CheckboxWithLabel>
        ))}
    </CheckboxGroup>
  );
};
