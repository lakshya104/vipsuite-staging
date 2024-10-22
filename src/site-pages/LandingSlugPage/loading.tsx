import React from 'react';
import { Skeleton, Box, Container, Typography, Grid } from '@mui/material';

const LandingSlugPageLoading = () => {
  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', mt: 3, flexDirection: 'column', alignItems: 'center', mb: 6 }}
      >
        <Skeleton variant="text" width="40%" height={70} />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={300} />
      <Box sx={{ mt: 2 }}>
        <Skeleton width="60%" height={30} />
        <Skeleton width="80%" height={30} />
        <Skeleton width="70%" height={30} />
      </Box>
      <Typography variant="h5" sx={{ mt: 8, mb: 4 }}>
        <Skeleton width="25%" height={70} />
      </Typography>
      <Grid container spacing={2} mb={10}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={6} sm={3} md={1.5} key={index}>
            <Skeleton variant="rectangular" width="100%" height={80} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LandingSlugPageLoading;
