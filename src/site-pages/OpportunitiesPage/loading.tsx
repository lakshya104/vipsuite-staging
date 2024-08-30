import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const OpportunitiesPageLoading = () => {
  return (
    <>
      <Box padding={2}>
        <Grid container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Skeleton variant="rectangular" width="100%" height={350} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default OpportunitiesPageLoading;
