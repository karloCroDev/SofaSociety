'use client';

// External packages
import { CheckboxGroup } from 'react-aria-components';
import * as React from 'react';

// Components
import { CheckboxWithLabel } from '@/components/ui/Checkbox';
import { FilterButton } from '@/components/ui/filters/FilterButton';
import { Icon } from '@/components/ui/Icon';

// Hooks
import { useSetUrlParams } from '@/hooks2/util/useSetUrlParams';

export const Materials = () => {
  // const setUrlParams = useSetUrlParams();

  return (
    <CheckboxGroup
      className="flex flex-col gap-8"
      // onChange={(val) => {
      //   setUrlParams('materials', val);
      // }}
    >
      <CheckboxWithLabel value="velvet">Velvet</CheckboxWithLabel>
      <CheckboxWithLabel value="linen">Linen</CheckboxWithLabel>
      <CheckboxWithLabel value="boucle">Boucle</CheckboxWithLabel>
      <CheckboxWithLabel value="leather">Leather</CheckboxWithLabel>
    </CheckboxGroup>
  );
};
