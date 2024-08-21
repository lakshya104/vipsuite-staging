import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Brand } from '@/interfaces/brand';
import BrandCard from './BrandsListing/BrandCard';

interface FilteredBrandsProps {
  searchQuery: string;
  brands: Brand[];
}

const FilteredBrands: React.FC<FilteredBrandsProps> = async ({ searchQuery, brands }) => {
  const filteredBrands = brands.filter((item) => {
    const matchesQuery = searchQuery ? item.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesQuery;
  });
  return (
    <>
      <Grid container mb={2.5}>
        <Grid item xs={12}>
          <Box width="100%">
            <Typography variant="h3" component="h2" mb={1}>
              {filteredBrands.length} Results for &quot;{searchQuery}&quot;
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid className="landing-product" container spacing={2.5}>
        {filteredBrands.length < 1 ? (
          <Container>
            <Typography marginTop={5} variant="h2" textAlign="center">
              No results found
            </Typography>
          </Container>
        ) : (
          filteredBrands.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id} className="landing-product__item">
              <BrandCard item={item} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default FilteredBrands;
