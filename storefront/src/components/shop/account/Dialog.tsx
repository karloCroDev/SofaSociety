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

// Components
import { Layout, LayoutRow, LayoutColumn } from '@/components/ui/Layout';

export const Dialog: React.FC<
  React.ComponentPropsWithoutRef<'button'> &
    DialogTriggerProps & {
      triggerChildren: React.ReactNode;
      children: React.ReactNode;
    }
> = ({ children, triggerChildren, title, ...rest }) => (
  <DialogTrigger {...rest}>
    {triggerChildren}
    <ModalOverlay
      isDismissable
      className="fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-gray-200/45 text-center"
    >
      <Layout>
        <LayoutRow className="justify-center">
          <LayoutColumn lg={6} xs={12}>
            <Modal
              isKeyboardDismissDisabled
              className="w-full overflow-hidden rounded bg-gray-10 px-4 py-6 text-left align-middle lg:p-6"
            >
              <AriaDialog className="relative z-max outline-none">
                <Heading className="mb-8 text-center text-lg" slot="title">
                  {title}
                </Heading>
                {children}
              </AriaDialog>
            </Modal>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </ModalOverlay>
  </DialogTrigger>
);
