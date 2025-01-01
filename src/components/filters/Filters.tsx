// Components
import { Slider } from '@/components/filters/Slider';
import { Color } from '@/components/filters/Color';
import { Materials } from '@/components/filters/Materials';
import { Collection } from '@/components/filters/Collection';
import { PopoverOption } from '@/components/filters/PopoverOption';
import { Sort } from '@/components/filters/Sort';
import { DrawerFilter } from '@/components/filters/DarwerFilter';
import { DrawerSort } from '@/components/filters/DrawerSort';

export const Filters = () => (
  <div className="mt-6 flex justify-between lg:mt-8">
    <div className="hidden gap-4 lg:flex">
      <PopoverOption title="Price">
        <Slider />
      </PopoverOption>
      <PopoverOption title="Color">
        <Color />
      </PopoverOption>
      <PopoverOption title="Materials">
        <Materials />
      </PopoverOption>
      <PopoverOption title="Collection">
        <Collection />
      </PopoverOption>
    </div>
    <div className="hidden lg:block">
      <PopoverOption
        title="Sort by"
        popoverProps={{
          placement: 'bottom right',
        }}
      >
        <Sort />
      </PopoverOption>
    </div>

    <DrawerFilter />
    <DrawerSort />
  </div>
);
