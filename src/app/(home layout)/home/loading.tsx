import React from 'react';
import { Box, Container, Grid, Skeleton } from '@mui/material';
import './Home.scss';
import SearchBar from '@/components/SearchBar';

const HomeLoading = () => {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <Box my={2.5}>
          <SearchBar searchTerm={''} placeholder="Search for events..." aria-label="Search events" />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} gap={2.5}>
          <Skeleton variant="rectangular" width="100%" height={140} />
          <Skeleton variant="rectangular" width="100%" height={140} />
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
      </Container>
    </Box>
  );
};

export default HomeLoading;
