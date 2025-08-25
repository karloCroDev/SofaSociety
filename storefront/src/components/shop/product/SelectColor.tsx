'use client';

// External packages
import * as React from 'react';
import { RadioGroup, Radio } from 'react-aria-components';
import { HttpTypes } from '@medusajs/types';

export const SelectColor: React.FC<{
  colors: {
    id: string;
    name: string;
    hex_code: string;
  }[];
  setProductOptions: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
  colorOption: HttpTypes.StoreProductOption;
}> = ({ colors, setProductOptions, colorOption }) => {
  const [color, setColor] = React.useState(colors[0].name);

  React.useEffect(() => {
    setProductOptions((prev) => ({
      ...prev,
      [colorOption.id]: colors[0].name,
    }));
  }, []);
  return (
    <>
      <div className="mt-6 flex">
        <p>Colors</p>
        <p className="ml-6 text-gray-500">
          {color && color[0].toUpperCase() + color.slice(1)}
        </p>
      </div>

      <RadioGroup
        onChange={(val) => {
          setColor(val.toString());
          setProductOptions((prev) => ({
            ...prev,
            [colorOption.id]: val.toString(),
          }));
        }}
        defaultValue={color}
        className="mt-4 flex gap-6"
      >
        {colors.map((color) => (
          <Radio
            value={color.name}
            className="group"
            id={color.name}
            key={color.id}
          >
            <div
              className="relative size-8 cursor-pointer bg-gray-500 after:absolute after:-bottom-2 after:w-full after:bg-gray-900 group-data-[selected]:after:h-px"
              style={{ backgroundColor: color.hex_code }}
            />
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};
