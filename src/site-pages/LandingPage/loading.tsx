import React from 'react';
import { Box, Skeleton, Grid2, Container, Typography } from '@mui/material';

const LandingPageLoading = () => {
  return (
    <Box component="main" className="site-main" minHeight="50vh">
      <Container>
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Skeleton sx={{ backgroundColor: 'darkgray' }} variant="text" width="70%" height={70} />
            <Skeleton sx={{ backgroundColor: 'darkgray' }} variant="text" width="70%" height={70} />
            <Skeleton sx={{ backgroundColor: 'darkgray' }} variant="text" width="40%" height={70} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Skeleton variant="rectangular" width={160} height={50} sx={{ mr: 3, backgroundColor: 'darkgray' }} />
            <Skeleton variant="rectangular" width={160} height={50} sx={{ backgroundColor: 'darkgray' }} />
          </Box>
        </Box>
        <Grid2 container spacing={4}>
          {[...Array(1)].map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} key={index}>
              <Box sx={{ position: 'relative', paddingTop: '56%', width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'darkgray',
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    zIndex: 1,
                  }}
                >
                  <Skeleton width={120} sx={{ backgroundColor: 'darkgray' }} />
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
        <Typography variant="h5" sx={{ mt: 8, mb: 4 }}>
          <Skeleton width="25%" height={70} sx={{ backgroundColor: 'darkgray' }} />
        </Typography>
        <Grid2 container spacing={2} mb={10}>
          {[...Array(8)].map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 3, md: 1.5 }} key={index}>
              <Skeleton variant="rectangular" width="100%" height={80} sx={{ backgroundColor: 'darkgray' }} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default LandingPageLoading;
