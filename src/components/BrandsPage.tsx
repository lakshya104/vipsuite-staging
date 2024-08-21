'use client';

import React, { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Brand } from '@/interfaces/brand';
import BrandsListing from './BrandsListing';
import ReferCard from './ReferCard';

interface EventsPageProps {
  brands: Brand[];
}

const EventsPage: React.FC<EventsPageProps> = ({ brands }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return brands;
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return brands.filter((brand) => {
      const searchableFields = [brand.title.rendered];
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
          placeholder="Search for events..."
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label="Search events"
        />
      </Box>
      {!searchQuery ? (
        <>
          <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
            <ReferCard
              heading="Refer a VIP"
              text="Lorem ipsum dolor sit amet, sed in posse primis, ius te putant molestie sapientem."
              href="/"
            />
            <ReferCard
              heading="Make a Request"
              text="Lorem ipsum dolor sit amet, sed in posse primis, ius te putant molestie sapientem."
              href="/"
            />
          </Box>
          <BrandsListing brands={filteredBrands} />
        </>
      ) : searchQuery && filteredBrands.length > 0 ? (
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
          <BrandsListing brands={filteredBrands} />
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

export default EventsPage;
