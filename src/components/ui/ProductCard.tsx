// External packages
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

export const ProductCard: React.FC<
  React.ComponentPropsWithoutRef<'div'> & {
    image: React.ReactNode;
    name: string;
    category: string;
    price: string;
    originalPrice?: string;
  }
> = ({ name, category, price, originalPrice, image, className, ...rest }) => (
  <Link href="/product-page">
    <div {...rest}>
      {image}
      <div className="mt-6 flex justify-between">
        <div>
          <h4>{name}</h4>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <div>
          <div>
            {price && (
              <p
                className={twJoin('font-bold', originalPrice && 'text-red-400')}
              >
                {price}
              </p>
            )}
            {originalPrice && (
              <p className="text-gray-500 line-through">{originalPrice}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </Link>
);
