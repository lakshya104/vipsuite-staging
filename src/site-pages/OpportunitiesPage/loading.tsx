import React from 'react';
import { Box, Grid2, IconButton, Skeleton } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';

const OpportunitiesPageLoading = () => {
  return (
    <>
      <Box my={2.5} display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
          aria-label="Filter opportunities"
          className="filter-button"
          sx={{
            mr: 1,
            bgcolor: 'transparent',
          }}
        >
          <Image src="/img/Filter.png" alt="Filter" width={30} height={30} />
        </IconButton>
        <SearchBar searchTerm={''} placeholder="Search for opportunities..." aria-label="Search opportunities" />
      </Box>
      <Box padding={2}>
        <Grid2 container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }} key={index}>
              <Skeleton variant="rectangular" width="100%" height={450} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default OpportunitiesPageLoading;
