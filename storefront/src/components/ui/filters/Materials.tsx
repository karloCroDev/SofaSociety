'use client';

// External packages
import {
  Dialog,
  DialogTrigger,
  Popover,
  CheckboxGroup,
} from 'react-aria-components';

// Components
import { CheckboxWithLabel } from '@/components/ui/Checkbox';
import { FilterButton } from '@/components/ui/filters/FilterButton';
import { Icon } from '@/components/ui/Icon';

export const Materials = () => {
  return (
    <CheckboxGroup className="flex flex-col gap-8">
      <CheckboxWithLabel value="velvet">Velvet</CheckboxWithLabel>
      <CheckboxWithLabel value="linen">Linen</CheckboxWithLabel>
      <CheckboxWithLabel value="boucle">Boucle</CheckboxWithLabel>
      <CheckboxWithLabel value="leather">Leather</CheckboxWithLabel>
    </CheckboxGroup>
  );
};
