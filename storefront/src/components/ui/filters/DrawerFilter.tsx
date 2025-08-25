'use client';

// External packages
import * as React from 'react';
import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { Dialog, Modal, ModalOverlay } from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';
import { FilterButton } from '@/components/ui/filters/FilterButton';
import { Button } from '@/components/ui/Button';
import { ProductFilters } from '@/components/ui/filters/ProductFilters';
import { FilterProps } from './Filters';

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

export const DrawerFilter: React.FC<FilterProps> = ({
  appliedCategoryFilters,
  categoryFilters,
  collectionFilters,
  appliedCollectionFilters,
  typesFilters,
  appliedTypeFilters,
  isCollectionHidden,
}) => {
  const [h, setH] = React.useState<number | null>(null);
  const [w, setW] = React.useState<number | null>(null);

  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    setH(window.innerHeight - SHEET_MARGIN);
    setW((window.innerWidth - SHEET_MARGIN) / window.innerWidth);
  }, []);

  const y = useMotionValue(h || 0);
  const bgOpacity = useTransform(y, [0, h || 1], [0.4, 0]);
  const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  if (w === null || h === null) return null;

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
            style={{ backgroundColor: bg }}
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
                <h4 className="text-lg font-semibold">Collection</h4>
                {!isCollectionHidden && (
                  <ProductFilters
                    type="collection"
                    appliedProductFilters={appliedCollectionFilters}
                    productFilters={collectionFilters}
                  />
                )}
                <h4 className="text-lg font-semibold">Category</h4>
                <ProductFilters
                  type="category"
                  appliedProductFilters={appliedCategoryFilters}
                  productFilters={categoryFilters}
                />
                <h4 className="text-lg font-semibold">Types</h4>
                <ProductFilters
                  type="type"
                  appliedProductFilters={appliedTypeFilters}
                  productFilters={typesFilters}
                />
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
