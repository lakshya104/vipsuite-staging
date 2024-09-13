import { FilterDropdown, ProductVariation } from '@/interfaces/brand';
import { filter, every, some, unionBy, startCase } from 'lodash';

export const getFilteredProductVariations = (
  productVariations: ProductVariation[],
  selectedFilters: FilterDropdown[],
) => {
  return filter(productVariations, (variation) =>
    every(selectedFilters, (selectedFilter) =>
      some(
        variation.attributes,
        (attribute) => selectedFilter.name === attribute.name && selectedFilter.option === attribute.option,
      ),
    ),
  );
};

export const getAttributes = (
  productVariations: ProductVariation[],
  selectedFilters: FilterDropdown[],
  searchFilterName?: string,
) => {
  if (!searchFilterName) {
    return undefined;
  }

  const variations = getFilteredProductVariations(productVariations, selectedFilters);

  const attributes = variations.flatMap((variation) => variation.attributes ?? []);

  const filters = unionBy(
    attributes.filter((attribute) => attribute.name === searchFilterName),
    (attribute) => attribute.option,
  );

  const filteredDropdown = filters.map((item) => {
    return {
      ...item,
      label: startCase(item.option.replaceAll('-', ' ')),
    };
  });

  return filteredDropdown.length > 0 ? filteredDropdown : undefined;
};
