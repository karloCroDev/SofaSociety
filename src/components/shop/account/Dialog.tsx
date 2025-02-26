'use client';
// External packages
import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  Dialog as AriaDialog,
  DialogTrigger,
  DialogTriggerProps,
  Heading,
} from 'react-aria-components';

// Import Button
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';

export const Dialog: React.FC<
  React.ComponentPropsWithoutRef<'div'> &
    DialogTriggerProps & {
      triggerChildren: React.ReactNode;
      children: React.ReactNode;
    }
> = ({ children, triggerChildren, title, ...rest }) => (
  <DialogTrigger {...rest}>
    {triggerChildren}
    <ModalOverlay className="fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-gray-200/25 p-4 text-center">
      <Layout>
        <LayoutRow className="justify-center">
          <LayoutColumn lg={6} xs={12}>
            <Modal className="w-full overflow-hidden rounded bg-white p-6 text-left align-middle">
              <AriaDialog className="relative outline-none">
                <div className="z-max flex flex-col gap-10 bg-gray-10">
                  <Heading className="text-lg">{title}</Heading>
                  {children}
                </div>
              </AriaDialog>
            </Modal>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </ModalOverlay>
  </DialogTrigger>
);
