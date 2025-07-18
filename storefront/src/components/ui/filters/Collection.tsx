'use client';

// External packages
import * as React from 'react';
import { CheckboxGroup } from 'react-aria-components';

// Components
import { CheckboxWithLabel } from '@/components/ui/Checkbox';

// Hooks
import { useSetUrlParams } from '@/hooks/useSetUrlParams';

export const Collection = () => {
  const setUrlParams = useSetUrlParams();
  return (
    <CheckboxGroup
      className="flex flex-col gap-8"
      onChange={(val) => {
        setUrlParams('collection', val);
      }}
    >
      <CheckboxWithLabel value="scandinavian-simplicity">
        Scandinavian Simplicity
      </CheckboxWithLabel>
      <CheckboxWithLabel value="modern-luxe">Modern luxe</CheckboxWithLabel>
      <CheckboxWithLabel value="boho-chic">Boho Chic</CheckboxWithLabel>
      <CheckboxWithLabel value="timeless-classics">
        Timeless classics
      </CheckboxWithLabel>
    </CheckboxGroup>
  );
};
