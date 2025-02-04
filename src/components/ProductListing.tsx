'use client';
import React, { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid2, Typography } from '@mui/material';
import { BrandProduct } from '@/interfaces/brand';
import { isEmpty } from 'lodash';
import ErrorFallback from './ErrorFallback';
import en from '@/helpers/lang';
import './CustomStepper/CustomStepper.scss';
import ProductCardsListing from './ProductCardsListing';

interface ProductListingContainerProps {
  products: BrandProduct[];
}

const ProductListingContainer: React.FC<ProductListingContainerProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const uniqueProducts = useMemo(() => {
    const uniqueProducts: BrandProduct[] = [];
    const mappedBrandIds = new Set();
    const countMap: Record<number, number> = {};

    products.forEach((item) => {
      const brandId = item.brand_id;
      if (brandId) {
        countMap[brandId] = (countMap[brandId] || 0) + 1;
      }
    });

    products.forEach((item) => {
      const brandId = item.brand_id;
      if (brandId) {
        item.isBrandCard = countMap[brandId] >= 2;
        if (!mappedBrandIds.has(brandId)) {
          mappedBrandIds.add(brandId);
          uniqueProducts.push(item);
        }
      } else {
        item.isBrandCard = false;
        uniqueProducts.push(item);
      }
    });

    return uniqueProducts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return uniqueProducts;
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return uniqueProducts.filter((product) => {
      const searchableFields = [product.name];
      return searchableFields.some((field) => field && field.toLowerCase().includes(lowerCaseQuery));
    });
  }, [searchQuery, uniqueProducts]);

  if (isEmpty(uniqueProducts)) {
    return (
      <>
        <Box my={2.5}>
          <SearchBar
            searchTerm={searchQuery}
            placeholder={en.products.searchPlaceholder}
            handleChange={handleChange}
            handleClear={handleClear}
            aria-label={en.products.searchPlaceholder}
          />
        </Box>
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noProductData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.noData}
        />
      </>
    );
  }

  return (
    <>
      <Box my={4}>
        <SearchBar
          searchTerm={searchQuery}
          placeholder={en.products.searchPlaceholder}
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label={en.products.searchPlaceholder}
        />
      </Box>
      {!searchQuery ? (
        <>
          <ProductCardsListing products={uniqueProducts} />
        </>
      ) : searchQuery && filteredProducts.length > 0 ? (
        <>
          <Grid2 container mb={2.5}>
            <Grid2 size={{ xs: 12 }}>
              <Box width="100%">
                <Typography variant="h3" component="h2" mb={1}>
                  {filteredProducts.length} {en.products.resultsFor} &quot;{searchQuery}&quot;
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
          <ProductCardsListing products={filteredProducts} />
        </>
      ) : (
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noProductData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.noData}
        />
      )}
    </>
  );
};

export default ProductListingContainer;
