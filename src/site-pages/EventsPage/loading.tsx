import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import SearchBar from '@/components/SearchBar';

const EventsPageLoading = () => {
  return (
    <>
      <Box my={2.5}>
        <SearchBar searchTerm={''} placeholder="Search for events..." aria-label="Search events" />
      </Box>
      <Box mt={2.5}>
        <Grid container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={450} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default EventsPageLoading;
