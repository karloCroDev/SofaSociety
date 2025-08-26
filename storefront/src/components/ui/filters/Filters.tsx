'use client';

// Components
import { ProductFilters } from '@/components/ui/filters/ProductFilters';
import { PopoverOption } from '@/components/ui/filters/PopoverOption';
import { Sort, type SortOptions } from '@/components/ui/filters/Sort';
import { DrawerFilter } from '@/components/ui/filters/DrawerFilter';
import { DrawerSort } from '@/components/ui/filters/DrawerSort';

type FilterObjectProps = {
  handle: string;
  name: string;
  id: string;
}[];

export interface FilterProps {
  categoryFilters?: string[];
  appliedCategoryFilters?: FilterObjectProps;
  collectionFilters?: string[];
  appliedCollectionFilters?: FilterObjectProps;
  typesFilters?: string[];
  appliedTypeFilters?: FilterObjectProps;
  isCollectionHidden?: boolean;
  sort?: SortOptions;
}

export const Filters: React.FC<FilterProps> = ({
  categoryFilters,
  appliedCategoryFilters,
  collectionFilters,
  appliedCollectionFilters,
  typesFilters,
  appliedTypeFilters,
  sort,
  isCollectionHidden = false,
}) => {
  console.log('Uhh', appliedCollectionFilters);
  return (
    <div className="mt-6 flex justify-between lg:mt-8">
      <div className="hidden gap-4 lg:flex">
        {!isCollectionHidden && (
          <PopoverOption title="Collection">
            <ProductFilters
              type="collection"
              productFilters={collectionFilters}
              appliedProductFilters={appliedCollectionFilters}
            />
          </PopoverOption>
        )}
        <PopoverOption title="Category">
          <ProductFilters
            type="category"
            productFilters={categoryFilters}
            appliedProductFilters={appliedCategoryFilters}
          />
        </PopoverOption>

        <PopoverOption title="Types">
          <ProductFilters
            type="type"
            productFilters={typesFilters}
            appliedProductFilters={appliedTypeFilters}
          />
        </PopoverOption>
      </div>
      <div className="hidden lg:block">
        <PopoverOption
          title="Sort by"
          popoverProps={{
            placement: 'bottom right',
          }}
        >
          <Sort sort={sort} />
        </PopoverOption>
      </div>

      <DrawerFilter
        categoryFilters={categoryFilters}
        appliedCategoryFilters={appliedCategoryFilters}
        collectionFilters={collectionFilters}
        appliedCollectionFilters={appliedCollectionFilters}
        typesFilters={typesFilters}
        appliedTypeFilters={appliedTypeFilters}
        sort={sort}
        isCollectionHidden={isCollectionHidden}
      />
      <DrawerSort sortBy={sort} />
    </div>
  );
};
