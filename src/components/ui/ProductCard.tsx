// External packages
import Link, { LinkProps } from 'next/link';
import { twJoin } from 'tailwind-merge';

export const ProductCard: React.FC<
  React.ComponentPropsWithoutRef<'a'> &
    Omit<LinkProps, 'href'> & {
      image: React.ReactNode;
      name: string;
      category: string;
      price: string;
      originalPrice?: string;
    }
> = ({ name, category, price, originalPrice, image, ...rest }) => (
  // TODO: Ovaj `{...rest}` uvijek stavljaj kao prvi prop, a ovaj `href` izbaci van komponente. Imat ćeš mjesta gdje ćeš htjeti imati drugačiji href, a nećeš moći.
  <Link href="/product" {...rest}>
    {image}
    <div className="mt-6 flex flex-col md:flex-row md:justify-between">
      <div>
        <h4>{name}</h4>
        <p className="hidden text-sm text-gray-500 lg:block">{category}</p>
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
