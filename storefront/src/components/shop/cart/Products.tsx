// Components
import { DeleteButton } from '@/components/shop/cart/DeleteButton';
import { CartItemPicker } from '@/components/shop/cart/HandleAddToCart';
import { HttpTypes } from '@medusajs/types';

export const Products: React.FC<{
  cart: HttpTypes.StoreCart;
  image: React.ReactNode | undefined;
  name: string | undefined;
  color: string | undefined;
  price: string;
  itemId: string;
  originalPrice?: string;
  amount: number;
  maxAmount: number;
}> = ({
  cart,
  image,
  name,
  color,
  price,
  originalPrice,
  maxAmount,
  itemId,
  amount,
}) => (
  <div className="flex h-52 w-full gap-5 border-t border-gray-200 py-8">
    {image}
    <div className="flex flex-1 flex-col">
      <h4 className="text-md lg:text-lg">{name}</h4>
      {color && <p className="text-xs text-gray-500 lg:text-sm">{color}</p>}
      <div className="flex items-center gap-2 py-4 lg:hidden">
        {originalPrice ? (
          <div className="flex flex-col">
            <p className="text-sm font-bold text-red-700">{price}</p>

            <p className="block text-sm text-gray-500 line-through">
              {originalPrice}
            </p>
          </div>
        ) : (
          <p className="font-bold">{price}</p>
        )}
      </div>

      <CartItemPicker
        cart={cart}
        itemId={itemId}
        maxAmount={maxAmount}
        amount={amount}
      />
    </div>
    <div className="ml-auto flex flex-col">
      {originalPrice ? (
        <>
          <p className="hidden text-md font-semibold text-red-700 lg:block">
            {price}
          </p>
          <p className="hidden text-end text-gray-500 line-through lg:block">
            {originalPrice}
          </p>
        </>
      ) : (
        <p className="hidden text-md lg:block">{price}</p>
      )}
    </div>
    <DeleteButton itemId={itemId} />
  </div>
);
