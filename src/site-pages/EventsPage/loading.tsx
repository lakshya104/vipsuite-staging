import React from 'react';
import { Box, Grid2, Skeleton } from '@mui/material';
import SearchBar from '@/components/SearchBar';

const EventsPageLoading = () => {
  return (
    <>
      <Box my={2.5}>
        <SearchBar searchTerm={''} placeholder="Search for events..." aria-label="Search events" />
      </Box>
      <Box mt={2.5}>
        <Grid2 container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Skeleton variant="rectangular" width="100%" height={450} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default EventsPageLoading;
