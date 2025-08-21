'use client';

// External packages
import * as React from 'react';
import { HttpTypes } from '@medusajs/types';

// Components
import { AddToCart } from '@/components/shop/AddToCart';
import { SelectMaterial } from '@/components/shop/product/SelectMaterial';
import { Button } from '@/components/ui/Button';
import { SelectColor } from '@/components/shop/product/SelectColor';
import { withReactQueryProvider } from '@/lib/config/react-query';

// Hooks
import { useCountryCode } from '@/hooks/util/country-code';
import { useAddCartItem } from '@/hooks/cart';

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

  const [amount, setAmount] = React.useState(1);

  // check if the selected variant is in stock

  const location = useCountryCode();

  const { mutate, isPending } = useAddCartItem();

  const addToCart = async () => {
    if (!doesOptionExists?.id) return;

    mutate({
      variant_id: doesOptionExists.id,
      quantity: amount,
      location,
    });
  };

  const materialOption = productItem.options?.find(
    (x) => x.title === 'Material'
  );
  const colorOption = productItem.options?.find((x) => x.title === 'Color');

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
          isVisuallyDisabled={!doesOptionExists || isPending}
          onPress={addToCart}
        >
          Add to cart
        </Button>
      </div>
    </>
  );
});
