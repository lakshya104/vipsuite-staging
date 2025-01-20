'use client';
import React, { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid, Typography } from '@mui/material';
import { BrandProduct } from '@/interfaces/brand';
import { isEmpty } from 'lodash';
import ErrorFallback from './ErrorFallback';
import en from '@/helpers/lang';
import './CustomStepper/CustomStepper.scss';
import ProductCardsListing from './ProductCardsListing';

interface ProductListingContainerProps {
  products: BrandProduct[];
  currentPage: number;
  totalPages: number;
}

const ProductListingContainer: React.FC<ProductListingContainerProps> = ({ products, currentPage, totalPages }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const searchableFields = [product.name];
      return searchableFields.some((field) => field && field.toLowerCase().includes(lowerCaseQuery));
    });
  }, [products, searchQuery]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  if (isEmpty(products)) {
    return (
      <>
        <Box my={2.5}>
          <SearchBar
            searchTerm={searchQuery}
            placeholder="Search for products..."
            handleChange={handleChange}
            handleClear={handleClear}
            aria-label="Search products"
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
          placeholder="Search for products..."
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label="Search products"
        />
      </Box>
      {!searchQuery ? (
        <>
          <ProductCardsListing products={products} currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : searchQuery && filteredProducts.length > 0 ? (
        <>
          <Grid container mb={2.5}>
            <Grid item xs={12}>
              <Box width="100%">
                <Typography variant="h3" component="h2" mb={1}>
                  {filteredProducts.length} Results for &quot;{searchQuery}&quot;
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <ProductCardsListing products={products} currentPage={currentPage} totalPages={totalPages} />
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
