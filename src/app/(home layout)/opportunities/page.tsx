import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import './opportunities.scss';
import OpportunitiesPage from '@/site-pages/OpportunitiesPage';
import OpportunitiesPageLoading from '@/site-pages/OpportunitiesPage/loading';

export default async function Page() {
  return (
    <Box className="opportunities">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          Opportunities
        </Typography>
        <Suspense fallback={<OpportunitiesPageLoading />}>
          <OpportunitiesPage />
        </Suspense>
      </Container>
    </Box>
  );
}
