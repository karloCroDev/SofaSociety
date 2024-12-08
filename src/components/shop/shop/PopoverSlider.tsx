'use client';

// External packages
import {
  Dialog,
  DialogTrigger,
  Popover,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';

// Components
import { FilterButton } from '@/components/shop/shop/FilterButton';
import { Icon } from '@/components/ui/Icon';

export const PopoverSlider = () => {
  return (
    <DialogTrigger>
      <FilterButton
        iconRight={
          <Icon name="chevron" className="size-4 text-gray-500 lg:size-6" />
        }
      >
        Price
      </FilterButton>
      <Popover placement="bottom left">
        <Dialog className="w-60 rounded border border-gray-200 bg-gray-10 p-4 outline-none">
          <Slider defaultValue={[0, 50000]} minValue={0} maxValue={5000}>
            <SliderTrack className="h-px w-full bg-gray-900">
              {({ state }) =>
                state.values.map((_, i) => (
                  <SliderThumb
                    key={i}
                    index={i}
                    className="size-4 rounded-full border border-gray-900 bg-gray-10"
                  />
                ))
              }
            </SliderTrack>
            <SliderOutput className="mt-4 flex justify-between">
              {({ state }) =>
                state.values.map((_, i) => (
                  <div key={i}>€{state.getThumbValueLabel(i)}</div>
                ))
              }
            </SliderOutput>
          </Slider>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
