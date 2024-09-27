import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './opportunities.scss';
import OpportunitiesPage from '@/site-pages/OpportunitiesPage';
import OpportunitiesPageLoading from '@/site-pages/OpportunitiesPage/loading';

export default async function Page() {
  return (
    <Box className="opportunities">
      <Container>
        <Suspense fallback={<OpportunitiesPageLoading />}>
          <OpportunitiesPage isAgent={true} />
        </Suspense>
      </Container>
    </Box>
  );
}
