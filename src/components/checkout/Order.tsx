// External packages
import Image from 'next/image';

// Assets
import ImageExaple from '@/public/images/product/paloma-heaven-details.png';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tag } from '@/components/ui/Tag';

export const Order = () => (
  <>
    <div className="bg-grayscale-50 px-8 pb-8 sm:px-12 lg:px-0 lg:pb-0">
      <div className="mb-8 flex justify-between text-sm md:text-base lg:mb-16">
        <p>Order - 1 item</p>
        <p className="cursor-pointer underline underline-offset-4">Edit card</p>
      </div>
      <div className="mb-8 flex gap-3">
        <div className="relative max-w-40 bg-white lg:bg-transparent">
          <Image src={ImageExaple} priority alt="" />
          <div className="absolute bottom-2 right-2 text-xs">
            <Tag>-50%</Tag>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <h4 className="text-sm font-black italic md:text-md">
            Sweat absorobent
          </h4>
          <ul>
            <li className="text-2xs md:text-base">Color: White</li>
            <li className="text-2xs md:text-base">Size : S</li>
            <li className="text-2xs md:text-base">Quantity: S</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-red-700">€30</p>
          <p className="text-sm text-gray-400 line-through">€45</p>
        </div>
      </div>
      <div className="lg:flex lg:gap-8">
        <Input
          label="Discount code"
          inputProps={{
            className: 'h-12',
          }}
        />
        <Button
          colorScheme="black"
          className="bg-grayscale-400 mb-8 h-12 w-full py-4 lg:w-1/4"
        >
          Apply
        </Button>
      </div>
      <div className="mb-2 flex justify-between text-sm md:text-base">
        <p>Subtotal</p>
        <p>€30</p>
      </div>
      <div className="mb-6 flex justify-between text-sm md:text-base">
        <p>Shipping</p>
        <p>€15</p>
      </div>
      <div className="mb-8 flex justify-between text-md md:text-lg">
        <p>Total</p>
        <p>€45</p>
      </div>
      <p className="text-grayscale-400">Including 11.25 tax </p>
    </div>
  </>
);
