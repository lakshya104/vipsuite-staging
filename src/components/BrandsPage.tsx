'use client';

import React, { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import { Box, Container, Grid2, Typography } from '@mui/material';
import { Brand } from '@/interfaces/brand';
import BrandsListing from './BrandsListing';
import { DashboardContent } from '@/interfaces';

interface BrandsPageProps {
  brands: Brand[];
  dashboardContent: DashboardContent | null;
}

const BrandsPage: React.FC<BrandsPageProps> = ({ brands, dashboardContent }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return brands;
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return brands.filter((brand) => {
      const searchableFields = [brand?.title?.rendered];
      return searchableFields.some((field) => field && field.toLowerCase().includes(lowerCaseQuery));
    });
  }, [brands, searchQuery]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <>
      <Box my={2.5}>
        <SearchBar
          searchTerm={searchQuery}
          placeholder="Search for brands..."
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label="Search Brands"
        />
      </Box>
      {!searchQuery ? (
        <BrandsListing brands={brands} hideReferCard={false} dashboardContent={dashboardContent} />
      ) : searchQuery && filteredBrands?.length > 0 ? (
        <>
          <Grid2 container mb={2.5}>
            <Grid2 size={{ xs: 12 }}>
              <Box width="100%">
                <Typography variant="h3" component="h2" mb={1}>
                  {filteredBrands?.length} Results for &quot;{searchQuery}&quot;
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
          <BrandsListing brands={filteredBrands} hideReferCard={true} />
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

export default BrandsPage;
