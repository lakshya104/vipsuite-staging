import React from 'react';
import { Box, Grid2, Skeleton } from '@mui/material';
import SearchBar from '@/components/SearchBar';

const HomePageLoading = () => {
  return (
    <>
      <Box my={2.5}>
        <SearchBar searchTerm={''} placeholder="Search for anything..." aria-label="Search anything" />
      </Box>
      <Box my={2.5}>
        <Grid2 container spacing={2}>
          {[...Array(3)].map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Skeleton variant="rectangular" width="100%" height={450} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} gap={2.5}>
        <Skeleton variant="rectangular" width="100%" height={140} />
        <Skeleton variant="rectangular" width="100%" height={140} />
      </Box>
      <Box my={2.5}>
        <Grid2 container spacing={2}>
          {[...Array(3)].map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Skeleton variant="rectangular" width="100%" height={450} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default HomePageLoading;
