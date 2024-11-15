'use client';
import React, { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import { Box, Container, Grid, Typography } from '@mui/material';
import { BrandProduct } from '@/interfaces/brand';
import MyProductsCard from './DashboardCard/MyProductCard';

interface ProductListingContainerProps {
  products: BrandProduct[];
}

const ProductListingContainer: React.FC<ProductListingContainerProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter products based on search query
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
        <Grid className="landing-product" container spacing={2} sx={{ mb: 5 }}>
          {products.map((product) => (
            <Grid className="landing-product__item" item xs={12} sm={6} lg={4} key={product.id}>
              <MyProductsCard data={product} />
            </Grid>
          ))}
        </Grid>
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
          <Grid className="landing-product" container spacing={2} sx={{ mb: 5 }}>
            {filteredProducts.map((product) => (
              <Grid className="landing-product__item" item xs={12} sm={6} lg={4} key={product.id}>
                <MyProductsCard data={product} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Container>
          <Typography marginTop={5} variant="h2" textAlign="center">
            No results found
          </Typography>
        </Container>
      )}
    </>
  );
};

export default ProductListingContainer;
