// External packages
import { HttpTypes } from '@medusajs/types';

// Components (types)
import { type SortOptions } from '@/components/ui/filters/Sort';

type MinPricedProduct = HttpTypes.StoreProduct & {
  _minPrice?: number;
};

export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sortBy: SortOptions
): HttpTypes.StoreProduct[] {
  const sortedProducts = products.slice() as MinPricedProduct[];

  const computeMinPrice = (product: MinPricedProduct): number => {
    if (!product.variants || product.variants.length === 0) {
      return Infinity;
    }
    return Math.min(
      ...product.variants.map(
        (variant) => variant?.calculated_price?.calculated_amount || 0
      )
    );
  };

  const sortByMinPrice = (asc: boolean) => {
    sortedProducts.forEach((product) => {
      product._minPrice = computeMinPrice(product);
    });

    sortedProducts.sort((a, b) =>
      asc ? a._minPrice! - b._minPrice! : b._minPrice! - a._minPrice!
    );
  };

  const sortByDate = () => {
    sortedProducts.sort(
      (a, b) =>
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  };

  switch (sortBy) {
    case 'price_asc':
      sortByMinPrice(true);
      break;
    case 'price_desc':
      sortByMinPrice(false);
      break;
    case 'created_at':
      sortByDate();
      break;
  }

  return sortedProducts;
}
