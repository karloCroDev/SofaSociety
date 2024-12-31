'use client';

import { CheckboxWithLabel } from '@/components/ui/Checkbox';
// External packages
import * as React from 'react';
import { CheckboxGroup } from 'react-aria-components';

export const Color = () => (
  <CheckboxGroup className="flex flex-col gap-8">
    <CheckboxWithLabel value="black">Black</CheckboxWithLabel>
    <CheckboxWithLabel value="gray">Gray</CheckboxWithLabel>
    <CheckboxWithLabel value="yellow">Yellow</CheckboxWithLabel>
    <CheckboxWithLabel value="red">Red</CheckboxWithLabel>
  </CheckboxGroup>
);
