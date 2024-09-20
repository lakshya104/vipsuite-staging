'use client';

import React, { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import { Box, Container, Grid, Typography } from '@mui/material';
import OpportunitiesCard from '@/components/OpportunitiesCard';
import { Opportunity } from '@/interfaces/opportunities';

interface OpportunitiesContainerProps {
  opportunitiesData: Opportunity[];
  token: string;
  vipId: number;
}

const OpportunitiesContainer: React.FC<OpportunitiesContainerProps> = ({ opportunitiesData, token, vipId }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOpportunities = useMemo(() => {
    if (!searchQuery.trim()) return opportunitiesData;
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return opportunitiesData.filter((event) => {
      const searchableFields = [event.title.rendered];
      return searchableFields.some((field) => field && field.toLowerCase().includes(lowerCaseQuery));
    });
  }, [opportunitiesData, searchQuery]);

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
          placeholder="Search for opportunities..."
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label="Search opportunities"
        />
      </Box>
      {!searchQuery ? (
        <OpportunitiesCard opportunities={opportunitiesData} token={token} vipId={vipId} />
      ) : searchQuery && filteredOpportunities.length > 0 ? (
        <>
          <Grid container mb={2.5}>
            <Grid item xs={12}>
              <Box width="100%">
                <Typography variant="h3" component="h2" mb={1}>
                  {filteredOpportunities.length} Results for &quot;{searchQuery}&quot;
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <OpportunitiesCard opportunities={filteredOpportunities} token={token} vipId={vipId} />
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

export default OpportunitiesContainer;
