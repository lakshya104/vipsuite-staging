import React from 'react';
import { Box, Container, Grid2, Typography, Skeleton } from '@mui/material';

const ProductDetailsPageLoading = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        <Skeleton variant="text" width="40%" height={40} />
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" width={500} height="100%" />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography variant="body1" gutterBottom>
            <Skeleton variant="text" width="60%" height={30} />
          </Typography>
          <Typography variant="h2" component="h2" gutterBottom>
            <Skeleton variant="text" width="60%" height={40} />
          </Typography>
          <Box>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Box>
          <Box mt={2}>
            <Skeleton variant="rectangular" width="100%" height={50} />
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ProductDetailsPageLoading;
