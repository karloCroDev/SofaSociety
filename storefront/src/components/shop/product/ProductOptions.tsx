'use client';

// External packages
import * as React from 'react';
import { HttpTypes } from '@medusajs/types';

// Components
import { AddToCart } from '@/components/shop/AddToCart';
import { SelectMaterial } from '@/components/shop/product/SelectMaterial';
import { Button } from '@/components/ui/Button';
import { SelectColor } from '@/components/shop/product/SelectColor';
import { isEqual } from 'lodash';
import { withReactQueryProvider } from '@/lib/util/react-query';
import { getVariantItemsInStock } from '@/lib/util/inventory';
import { useAddLineItem } from '@/hooks/cart';
import { useCountryCode } from '@/hooks/country-code';

const convertToObject = (options: HttpTypes.StoreProductVariant['options']) => {
  let converter: Record<string, string> = {};

  options?.forEach((option) => {
    if (option.option_id) {
      converter[option.option_id] = option.value;
    }
  });

  return converter;
};

export const ProductOptions: React.FC<{
  productItem: HttpTypes.StoreProduct;
  customization: {
    id: string;
    name: string;
    colors: {
      id: string;
      name: string;
      hex_code: string;
    }[];
  }[];
}> = withReactQueryProvider(({ customization, productItem }) => {
  const [productOptions, setProductOptions] = React.useState<
    Record<string, string | undefined>
  >({});

  const doesOptionExists =
    productItem.variants &&
    productItem.variants.find((v) => {
      const variantOptions = convertToObject(v.options);
      return JSON.stringify(variantOptions) === JSON.stringify(productOptions);
    });

  console.log(doesOptionExists);
  const [amount, setAmount] = React.useState(1);

  // check if the selected variant is in stock
  const itemsInStock = doesOptionExists
    ? getVariantItemsInStock(doesOptionExists)
    : 0;

  const location = useCountryCode();

  const { mutateAsync, isPending } = useAddLineItem();

  const addToCart = async () => {
    if (!doesOptionExists?.id) return;
    await mutateAsync(
      {
        variantId: doesOptionExists.id,
        quantity: amount,
        countryCode: location,
      },
      {
        onSuccess: (res) => {
          console.log(res);
          console.log('success please');
        },
      }
    );
  };

  const materialOption = productItem.options?.find(
    (x) => x.title === 'Material'
  );
  const colorOption = productItem.options?.find((x) => x.title === 'Color');

  console.log(productOptions);
  return (
    <>
      <SelectMaterial
        setProductOptions={setProductOptions}
        customization={customization}
        materialOption={materialOption}
      />
      {!!productOptions[materialOption?.id!] && (
        <SelectColor
          setProductOptions={setProductOptions}
          colors={customization.flatMap((color) => color.colors)}
          colorOption={colorOption}
        />
      )}
      <div className="mt-8 flex flex-col justify-between gap-4 lg:mt-auto lg:flex-row">
        <AddToCart size="lg" setAmount={setAmount} />
        <Button
          className="flex-1"
          isVisuallyDisabled={!!itemsInStock || isPending}
          onPress={addToCart}
        >
          Add to cart
        </Button>
      </div>
    </>
  );
});
