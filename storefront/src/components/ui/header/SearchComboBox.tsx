'use client';

// External packages
import * as React from 'react';
import {
  Input,
  ComboBox,
  ListBoxItem,
  Popover,
  ListBox,
} from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
// import { Hit } from 'meilisearch';

// Components
import { Icon } from '@/components/ui/Icon';

// Lib
import { MeiliSearchProductHit, searchClient } from '@/lib/search-client';
import { getProductsById } from '@/lib/data/products';
import { getProductPrice } from '@/lib/util/get-product-price';
import { CodeCountryTypes } from '@/components/ui/header/Header';
import { useCountryCode } from '@/hooks/country-code';
import { useDebounce } from '@/hooks2/useDebounce';
import { HttpTypes } from '@medusajs/types';
import Image from 'next/image';
import Link from 'next/link';

export const SearchComboBox: React.FC<{
  codeCountry: CodeCountryTypes;
}> = ({ codeCountry }) => {
  const countryCode = useCountryCode();
  const region = codeCountry.find((x) => x.country === countryCode)?.id;
  const [displayComboBox, setDisplayComboBox] = React.useState(false);
  const [value, setValue] = React.useState('');

  const [products, setProducts] = React.useState<HttpTypes.StoreProduct[]>([]);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const debounceValue = useDebounce(value);

  // Move this to work with react query!
  React.useEffect(() => {
    const findQueries = async () => {
      const results = await searchClient
        .index('products')
        .search<MeiliSearchProductHit>(debounceValue, undefined);
      const medusaProducts = await getProductsById({
        ids: results.hits.map((h) => h.id),
        regionId: region!,
      });

      setProducts(medusaProducts);
    };
    hasLoaded && findQueries(); // Making sure that this will be only displayed once a text changes, not immediately

    setHasLoaded(true);
  }, [debounceValue]);

  console.log(products);

  return (
    <div className="flex items-center gap-4">
      <Icon
        name="search"
        className="cursor-pointer"
        onClick={() => setDisplayComboBox(!displayComboBox)}
      />

      <div
        className={twJoin(
          'overflow-hidden transition-[width]',
          displayComboBox ? 'w-36' : 'w-0'
        )}
      >
        <ComboBox>
          <Input
            className="w-full border-0 border-b border-b-current bg-inherit outline-none"
            onChange={(e) => setValue(e.target.value)}
          />
          <Popover className="w-36">
            <ListBox className="flex flex-col gap-y-4 rounded border border-gray-900 bg-gray-10 p-2">
              {products.map((product) => (
                <ListBoxItem key={product.id}>
                  <Link href={`/product/${product.handle}`}>
                    <Image
                      src={product.thumbnail || ''}
                      alt={product.description || ''}
                    />
                    <p>{product.title}</p>
                  </Link>
                </ListBoxItem>
              ))}
              <ListBoxItem>Aardvark</ListBoxItem>
            </ListBox>
          </Popover>
        </ComboBox>
      </div>
    </div>
  );
};
