import { useEffect, useMemo, useState } from 'react';
import { first, nth, take } from 'lodash';
import * as z from 'zod';

import { Product, FilterDropdown } from '@/interfaces/brand';
import { getAttributes, getFilteredProductVariations } from '@/helpers/product';
import en from '@/helpers/lang';

export const useProductFilters = (product?: Product) => {
  const { product_attributes = [], product_variations: productVariations = [] } = product ?? {};

  const [selectedFilters, setSelectedFilters] = useState<FilterDropdown[]>([]);

  const [dropdowns, setDropdowns] = useState<FilterDropdown[][]>([]);

  useEffect(() => {
    const firstDropDown = getAttributes(productVariations, [], first(product_attributes)?.name);

    if (firstDropDown) {
      setDropdowns([firstDropDown]);
    }
  }, [product_attributes, productVariations]);

  const onChangeDropDown = (selectedFilter: FilterDropdown, index: number) => {
    const newSelectedFilters = [...take(selectedFilters, index), selectedFilter];

    const nextIndex = index + 1;

    const nextDropdown = getAttributes(productVariations, newSelectedFilters, nth(product_attributes, nextIndex)?.name);

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
            required_error: en.common.fieldErrorMessage,
          })
          .min(1, en.common.fieldErrorMessage);
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
