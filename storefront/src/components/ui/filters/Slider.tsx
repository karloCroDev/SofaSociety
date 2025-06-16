'use client';

// External packages
import * as React from 'react';
import {
  Slider as AriaSlider,
  SliderTrack,
  SliderThumb,
  SliderOutput,
} from 'react-aria-components';

export const Slider = () => (
  <AriaSlider defaultValue={[0, 50000]} minValue={0} maxValue={5000}>
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
  </AriaSlider>
);
