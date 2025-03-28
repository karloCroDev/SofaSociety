// External packages
import Image from 'next/image';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Assets
import ImageExaple from '@/public/images/product/paloma-heaven-details.png';

export const Order = () => (
  <div className="px-8 pb-8 sm:px-12 lg:px-0 lg:pb-0">
    <div className="flex justify-between lg:mb-16">
      <p>Order - 1 item</p>
      {/* TODO: Kada kliknem na `Edit card` ispod ništa se ne dešava. */}
      <p className="cursor-pointer underline underline-offset-4">Edit card</p>
    </div>

    <div className="mt-8 flex gap-3">
      <div className="relative max-w-40 bg-white lg:bg-transparent">
        <Image src={ImageExaple} alt="Example" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <h4 className="font-bold">Paloma heaven</h4>
        <ul>
          <li className="text-2xs md:text-base">Material: White</li>
          <li className="text-2xs md:text-base">Color: Gray</li>
        </ul>
      </div>
      <p>€45</p>
    </div>
    <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:gap-8">
      <Input label="Discount code" inputProps={{ className: 'h-12' }} />
      <Button isVisuallyDisabled>Apply</Button>
    </div>
    <div className="mt-8 flex justify-between text-sm md:text-base">
      <p>Subtotal</p>
      <p>€1200</p>
    </div>
    <div className="mt-2 flex justify-between text-sm md:text-base">
      <p>Coupon applied</p>
      <p className="text-red-400">-€20.65</p>
    </div>
    <div className="mt-2 flex justify-between text-sm md:text-base">
      <p>Shipping</p>
      <p>€50</p>
    </div>
    <div className="mt-6 flex justify-between text-lg">
      <p>Total</p>
      <p>€45</p>
    </div>
  </div>
);
