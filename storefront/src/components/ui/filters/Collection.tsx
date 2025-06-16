'use client';

import { CheckboxWithLabel } from '@/components/ui/Checkbox';
// External packages
import * as React from 'react';
import { CheckboxGroup } from 'react-aria-components';

export const Collection = () => (
  <CheckboxGroup className="flex flex-col gap-8">
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
