'use client';

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
import { Dialog, Modal, ModalOverlay } from 'react-aria-components';

import { Icon } from '@/components/ui/Icon';
import { FilterButton } from '@/components/ui/filters/FilterButton';
import { Button } from '@/components/ui/Button';
import { Sort, type SortOptions } from '@/components/ui/filters/Sort';

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

// Constants
const SHEET_RADIUS = 12;

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

export const DrawerSort: React.FC<{
  sortBy?: SortOptions;
}> = ({ sortBy }) => {
  const [isOpen, setOpen] = React.useState(false);

  const [dimensions, setDimensions] = React.useState<{
    h: number;
    w: number;
    sheetMargin: number;
  } | null>(null);

  React.useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const sheetMargin = height / 2;

    setDimensions({
      h: height - sheetMargin,
      w: (width - sheetMargin) / width,
      sheetMargin,
    });
  }, []);

  const y = useMotionValue(dimensions?.h || 1);
  const bgOpacity = useTransform(y, [0, dimensions?.h || 1], [0.4, 0]);
  const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  if (!dimensions) return null;
  return (
    <>
      <FilterButton
        iconRight={
          <Icon name="chevron" className="size-4 text-gray-500 lg:size-6" />
        }
        className="lg:hidden"
        onPress={() => setOpen(true)}
      >
        Sort
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
              initial={{ y: dimensions.h }}
              animate={{ y: 0 }}
              exit={{ y: dimensions.h }}
              transition={staticTransition}
              style={{ y, top: dimensions.sheetMargin }}
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
                <Sort sort={sortBy} />
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
