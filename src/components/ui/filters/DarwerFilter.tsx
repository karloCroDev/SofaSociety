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
import { FilterButton } from '@/components/ui/filters/FilterButton';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/filters/Slider';
import { Color } from '@/components/ui/filters/Color';
import { Materials } from '@/components/ui/filters/Materials';
import { Collection } from '@/components/ui/filters/Collection';

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

const root = document.body.firstChild as HTMLElement;

export const DrawerFilter = () => {
  const SHEET_MARGIN = 144;
  const SHEET_RADIUS = 12;
  const [isOpen, setOpen] = React.useState(false);
  let h = window.innerHeight - SHEET_MARGIN;
  let y = useMotionValue(h);
  let bgOpacity = useTransform(y, [0, h], [0.4, 0]);
  let bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

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
            isOpen
            onOpenChange={setOpen}
            className="fixed inset-0 z-10"
            style={{ backgroundColor: bg as any }}
          >
            <MotionModal
              className="-max-h-20 absolute bottom-0 w-full bg-gray-10 shadow-lg will-change-transform"
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{
                y,
                top: SHEET_MARGIN,
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
              <Dialog className="relative flex h-full flex-col gap-6 overflow-scroll p-6 pb-24 outline-none">
                <h4 className="text-lg font-semibold">Shop</h4>
                <Slider />
                <h4 className="text-lg font-semibold">Color</h4>
                <Color />
                <h4 className="text-lg font-semibold">Materials</h4>
                <Materials />
                <h4 className="text-lg font-semibold">Collection</h4>
                <Collection />
              </Dialog>
              <div className="absolute bottom-0 w-full border-t border-gray-200 bg-gray-10 px-6 py-4">
                <Button className="w-full" onPress={() => setOpen(false)}>
                  Show results
                </Button>
              </div>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};
