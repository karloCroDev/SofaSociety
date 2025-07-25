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
import { HttpTypes } from '@medusajs/types';
import { useRouter } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
//Components
import { Icon } from '@/components/ui/Icon';
import { CodeCountryTypes } from '@/components/ui/header/Header';

// Lib
import { MeiliSearchProductHit, searchClient } from '@/lib/search-client';
import { getProductsById } from '@/lib/data/products';

// Hooks
import { useCountryCode } from '@/hooks/country-code';
import { useDebounce } from '@/hooks2/useDebounce';

export const SearchComboBox: React.FC<{ codeCountry: CodeCountryTypes }> = ({
  codeCountry,
}) => {
  const router = useRouter();
  const countryCode = useCountryCode();
  const region = codeCountry.find((x) => x.country === countryCode)?.id;

  const [displayComboBox, setDisplayComboBox] = React.useState(false);
  const [value, setValue] = React.useState('');

  const [products, setProducts] = React.useState<HttpTypes.StoreProduct[]>([]);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const debounceValue = useDebounce(value);

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
    hasLoaded && debounceValue && findQueries();

    setHasLoaded(true);
  }, [debounceValue]);

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
        <ComboBox inputValue={value} onInputChange={setValue} items={products}>
          <Input className="w-full border-0 border-b border-b-current bg-inherit outline-none" />
          <Popover className="w-36">
            <ListBox className="flex flex-col gap-y-4 rounded border border-gray-900 bg-gray-10 p-2">
              {products.length > 0 ? (
                products.map((product) => (
                  <ListBoxItem
                    key={product.id}
                    onAction={() => router.push(`/product/${product.handle}`)}
                    className="cursor-pointer"
                  >
                    {product.title}
                  </ListBoxItem>
                ))
              ) : (
                <ListBoxItem>No products found</ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </ComboBox>
      </div>
    </div>
  );
};
