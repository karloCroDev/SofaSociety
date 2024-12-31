'use client';

// External packages
import * as React from 'react';
import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';
import { FilterButton } from '@/components/shop/shop/FilterButton';

// Wrap React Aria modal components so they support framer-motion values.
const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

// Animations
const inertiaTransition = {
  type: 'inertia' as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

const SHEET_MARGIN = 144;
const SHEET_RADIUS = 12;

const root = document.body.firstChild as HTMLElement;

export const Drawer = () => {
  let [isOpen, setOpen] = React.useState(false);
  let h = window.innerHeight - SHEET_MARGIN;
  let y = useMotionValue(h);
  let bgOpacity = useTransform(y, [0, h], [0.4, 0]);
  let bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  // Scale the body down when the sheet is open.
  let bodyScale = useTransform(
    y,
    [0, h],
    [(window.innerWidth - SHEET_MARGIN) / window.innerWidth, 1]
  );
  let bodyTranslate = useTransform(y, [0, h], [SHEET_MARGIN - SHEET_RADIUS, 0]);

  useMotionValueEvent(bodyScale, 'change', (v) => (root.style.scale = `${v}`));
  useMotionValueEvent(
    bodyTranslate,
    'change',
    (v) => (root.style.translate = `0 ${v}px`)
  );

  return (
    <>
      <FilterButton
        iconRight={
          <Icon name="plus" className="size-4 text-gray-500 lg:size-6" />
        }
        className="lg:hidden"
        onPress={() => setOpen(true)}
      >
        Filter
      </FilterButton>
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            // Force the modal to be open when AnimatePresence renders it.
            isOpen
            onOpenChange={setOpen}
            className="fixed inset-0 z-10"
            style={{ backgroundColor: bg as any }}
          >
            <MotionModal
              className="absolute bottom-0 w-full bg-gray-10 shadow-lg will-change-transform"
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{
                y,
                top: SHEET_MARGIN,
                // Extra padding at the bottom to account for rubber band scrolling.
                paddingBottom: window.screen.height,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  setOpen(false);
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              <Dialog className="p-6 outline-none">
                <Heading slot="title" className="mb-4 text-3xl font-semibold">
                  Modal sheet
                </Heading>
                <p className="mb-4 text-lg">
                  This is a dialog with a custom modal overlay built with React
                  Aria Components and Framer Motion.
                </p>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean sit amet nisl blandit, pellentesque eros eu,
                  scelerisque eros. Sed cursus urna at nunc lacinia dapibus.
                  Lorem*3
                </p>
              </Dialog>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};
