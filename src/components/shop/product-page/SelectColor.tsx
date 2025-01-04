'use client';

// External packages
import * as React from 'react';
import { RadioGroup, Radio } from 'react-aria-components';

// Components
import { Icon } from '@/components/ui/Icon';

export const SelectColor = () => {
  const [color, setColor] = React.useState('dark gray');

  return (
    <>
      <div className="mt-16 flex">
        <p>Materials</p>
        <p className="ml-6 text-gray-500">
          {color && color[0].toUpperCase() + color.slice(1)}
        </p>
      </div>
      <RadioGroup
        onChange={(e) => setColor(e.toString())}
        defaultValue={color}
        className="mt-6 flex gap-6"
      >
        <Radio value="dark gray" className="group">
          <div className="relative size-8 cursor-pointer bg-gray-500 after:absolute after:-bottom-2 after:w-full after:bg-gray-900 group-data-[selected]:after:h-px" />
        </Radio>
        <Radio value="black" className="group">
          <div className="relative size-8 cursor-pointer bg-gray-900 after:absolute after:-bottom-2 after:w-full after:bg-gray-900 group-data-[selected]:after:h-px" />
        </Radio>
        <Radio value="light gray" className="group">
          <div className="relative size-8 cursor-pointer bg-gray-200 after:absolute after:-bottom-2 after:w-full after:bg-gray-900 group-data-[selected]:after:h-px" />
        </Radio>
      </RadioGroup>
    </>
  );
};
