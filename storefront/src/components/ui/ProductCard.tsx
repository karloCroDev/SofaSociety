// External packages
import Link, { LinkProps } from 'next/link';
import { twJoin } from 'tailwind-merge';

export const ProductCard: React.FC<
  React.ComponentPropsWithoutRef<'a'> &
    LinkProps & {
      image: React.ReactNode | undefined;
      name: string;
      category: string | undefined;
      price: string | undefined;
      originalPrice?: string;
    }
> = ({ name, category, price, originalPrice, image, ...rest }) => (
  <Link {...rest}>
    {image}
    <div className="mt-6 flex flex-col md:flex-row md:justify-between">
      <div>
        <h4>{name}</h4>
        {category && (
          <p className="hidden text-sm text-gray-500 lg:block">{category}</p>
        )}
      </div>
      <div>
        {price && (
          <p
            className={twJoin(
              'text-sm font-bold lg:text-base',
              originalPrice && 'text-red-400'
            )}
          >
            {price}
          </p>
        )}
        {originalPrice && (
          <p className="text-gray-500 line-through">{originalPrice}</p>
        )}
      </div>
    </div>
  </Link>
);

export const ProductCardSkeleton = () => (
  <div className="animate-pulse flex aspect-[4/3] flex-col">
    <div className="flex-1 rounded-lg bg-gray-200" />

    <div className="mt-6 flex flex-col gap-4 md:flex-row md:justify-between">
      <div>
        <div className="h-5 w-40 rounded bg-gray-200" />
        <div className="mt-2 hidden h-4 w-24 rounded bg-gray-200 lg:block" />
      </div>
      <div>
        <div className="h-5 w-20 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-16 rounded bg-gray-200" />
      </div>
    </div>
  </div>
);
