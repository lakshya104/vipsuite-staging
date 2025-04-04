import React from 'react';
import { Box, Grid2, Skeleton } from '@mui/material';
import SearchBar from '@/components/SearchBar';

const ProductsPageLoading = () => {
  return (
    <>
      <Box my={2.5}>
        <SearchBar searchTerm={''} placeholder="Search for products..." aria-label="Search products" />
      </Box>
      <Box padding={2}>
        <Grid2 container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }} key={index}>
              <Skeleton variant="rectangular" width="100%" height={450} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default ProductsPageLoading;
