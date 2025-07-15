'use client';

// External packages
import * as React from 'react';
import { RadioGroup, Radio } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { AddToCart } from '@/components/shop/AddToCart';

export const SelectColor: React.FC<{
  colors: {
    id: string;
    name: string;
    hex_code: string;
  }[];
}> = ({ colors }) => {
  const [color, setColor] = React.useState(colors[0].name);

  return (
    <>
      <div className="mt-6 flex">
        <p>Colors</p>
        <p className="ml-6 text-gray-500">
          {color && color[0].toUpperCase() + color.slice(1)}
        </p>
      </div>
      {/* TODO: Razmak ispod ove radio grupe mi pari manji nego bi triba bit. FIXED*/}
      <RadioGroup
        onChange={(e) => setColor(e.toString())}
        defaultValue={color}
        className="mt-4 flex gap-6"
      >
        {colors.map((color) => (
          <Radio value={color.name} className="group">
            <div
              className="relative size-8 cursor-pointer bg-gray-500 after:absolute after:-bottom-2 after:w-full after:bg-gray-900 group-data-[selected]:after:h-px"
              style={{ backgroundColor: color.hex_code }}
            />
          </Radio>
        ))}
      </RadioGroup>
      <div className="mt-8 flex flex-col justify-between gap-4 lg:mt-auto lg:flex-row">
        <AddToCart size="lg" />
        {/* TODO: Ovaj botun ispod mi pari veći nego bi triba bit. FIXED */}
        <Button className="flex-1">Add to cart</Button>
      </div>
    </>
  );
};
