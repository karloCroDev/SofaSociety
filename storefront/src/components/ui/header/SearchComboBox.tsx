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
import { useRouter } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

//Components
import { Icon } from '@/components/ui/Icon';
import { CodeCountryTypes } from '@/components/ui/header/Header';
import Image from 'next/image';

// Hooks
import { useCountryCode } from '@/hooks/country-code';
import { useDebounce } from '@/hooks2/useDebounce';
import { getProductPrice } from '@/lib/util/get-product-price';
import { useSearchProducts } from '@/hooks/store';
import { withReactQueryProvider } from '@/lib/util/react-query';

export const SearchComboBox: React.FC<{ codeCountry: CodeCountryTypes }> =
  withReactQueryProvider(({ codeCountry }) => {
    const router = useRouter();
    const countryCode = useCountryCode();

    const [displayComboBox, setDisplayComboBox] = React.useState(false);

    const [value, setValue] = React.useState('');
    const debounceValue = useDebounce(value);

    const {
      data: products,
      isLoading,
      refetch,
    } = useSearchProducts({
      value: debounceValue,
      region: codeCountry.find((x) => x.country === countryCode)?.id,
    });

    React.useEffect(() => {
      refetch();
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
          <ComboBox
            inputValue={value}
            onInputChange={setValue}
            items={products}
          >
            <Input className="w-full border-0 border-b border-b-current bg-inherit outline-none" />
            <Popover className="w-80">
              <ListBox className="flex flex-col rounded border border-gray-900 bg-gray-10">
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => {
                    const productPrice = getProductPrice({
                      product,
                    });

                    console.log(product);
                    return (
                      <ListBoxItem
                        key={product.id}
                        onAction={() =>
                          router.push(`/product/${product.handle}`)
                        }
                        className="flex cursor-pointer gap-2 border-b border-gray-300 p-6 hover:bg-gray-200"
                      >
                        <div className="relative h-24 w-20">
                          <Image
                            src={
                              product.images && product.images.length > 0
                                ? product.images[0].url
                                : ''
                            }
                            alt={product.title}
                            className="object-cover"
                            fill
                          />
                        </div>
                        <div>
                          <p>{product.title}</p>
                          {product.variants && (
                            <p className="text-xs">
                              {product.variants[0].title}
                            </p>
                          )}
                        </div>

                        <div className="ml-auto">
                          <p>{productPrice.cheapestPrice?.calculated_price}</p>

                          {productPrice.cheapestPrice?.original_price !==
                            productPrice.cheapestPrice?.calculated_price && (
                            <p className="ml-auto text-end text-red-400 line-through">
                              {productPrice.cheapestPrice?.original_price}
                            </p>
                          )}
                        </div>
                      </ListBoxItem>
                    );
                  })
                ) : (
                  <ListBoxItem>No products found</ListBoxItem>
                )}
              </ListBox>
            </Popover>
          </ComboBox>
        </div>
      </div>
    );
  });
