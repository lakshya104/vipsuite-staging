import { useMemo, useState } from 'react';
import { first, nth, take } from 'lodash';
import * as z from 'zod';

import { Product, FilterDropdown } from '@/interfaces/brand';
import { getAttributes, getFilteredProductVariations } from '@/helpers/product';
import en from '@/helpers/lang';

export const useProductFilters = (product?: Product) => {
  const { product_attributes = [], product_variations: productVariations = [] } = product ?? {};

  const [selectedFilters, setSelectedFilters] = useState<FilterDropdown[]>([]);

  const dropdowns = useMemo(() => {
    const baseDropdown = getAttributes(productVariations, [], first(product_attributes)?.name);
    if (!baseDropdown) return [];

    const result: FilterDropdown[][] = [baseDropdown];
    for (let index = 0; index < selectedFilters.length; index += 1) {
      const nextIndex = index + 1;
      const nextDropdown = getAttributes(productVariations, [...take(selectedFilters, nextIndex)], nth(product_attributes, nextIndex)?.name);
      if (!nextDropdown) break;
      result.push(nextDropdown);
    }

    return result;
  }, [productVariations, product_attributes, selectedFilters]);

  const onChangeDropDown = (selectedFilter: FilterDropdown, index: number) => {
    const newSelectedFilters = [...take(selectedFilters, index), selectedFilter];
    setSelectedFilters(newSelectedFilters);
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
