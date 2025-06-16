'use client';

// External packages
import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  Popover,
  DialogProps,
  PopoverProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

// Components
import { FilterButton } from '@/components/ui/filters/FilterButton';
import { Icon } from '@/components/ui/Icon';

export const PopoverOption: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    DialogProps & {
      popoverProps?: React.ComponentPropsWithoutRef<'div'> & PopoverProps;
    }
> = ({ title, popoverProps, children, className }) => (
  <DialogTrigger>
    <FilterButton
      iconRight={
        <Icon name="chevron" className="size-4 text-gray-500 lg:size-6" />
      }
    >
      {title}
    </FilterButton>

    <Popover
      {...popoverProps}
      placement={popoverProps?.placement || 'bottom left'}
    >
      <Dialog
        className={twMerge(
          'w-64 rounded border border-gray-200 bg-gray-10 p-4 outline-none',
          className
        )}
      >
        {children}
      </Dialog>
    </Popover>
  </DialogTrigger>
);
