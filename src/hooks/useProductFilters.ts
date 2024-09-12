import { useEffect, useMemo, useState } from 'react';
import { first, nth, take } from 'lodash';
import * as z from 'zod';

import { Product, FilterDropdown } from '@/interfaces/brand';
import { getAttributes, getFilteredProductVariations } from '@/helpers/product';

export const useProductFilters = (product?: Product) => {
  const { attributes = [], product_variations: productVariations = [] } = product ?? {};

  const [selectedFilters, setSelectedFilters] = useState<FilterDropdown[]>([]);

  const [dropdowns, setDropdowns] = useState<FilterDropdown[][]>([]);

  useEffect(() => {
    const firstDropDown = getAttributes(productVariations, [], first(attributes)?.name);

    if (firstDropDown) {
      setDropdowns([firstDropDown]);
    }
  }, [attributes, productVariations]);

  const onChangeDropDown = (selectedFilter: FilterDropdown, index: number) => {
    const newSelectedFilters = [...take(selectedFilters, index), selectedFilter];

    const nextIndex = index + 1;

    const nextDropdown = getAttributes(productVariations, newSelectedFilters, nth(attributes, nextIndex)?.name);

    const newDropdowns = [...take(dropdowns, nextIndex), ...(nextDropdown ? [nextDropdown] : [])];

    setSelectedFilters(newSelectedFilters);
    setDropdowns(newDropdowns);
  };

  const formSchema = useMemo(() => {
    const keys = dropdowns.map((dropdown) => {
      const firstItem = first(dropdown);
      return firstItem!.name;
    });

    return z.object(
      keys.reduce((acc, key) => {
        acc[key] = z
          .string({
            required_error: 'This field is required',
          })
          .min(1, 'This field is required');
        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as any),
    );
  }, [dropdowns]);

  const getSelectedProductVariation = () => {
    return first(getFilteredProductVariations(productVariations, selectedFilters))!;
  };

  return {
    selectedFilters,
    dropdowns,
    onChangeDropDown,
    getSelectedProductVariation,
    formSchema,
  };
};
