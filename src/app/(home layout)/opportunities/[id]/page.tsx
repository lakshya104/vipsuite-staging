import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import '../opportunities.scss';
import OpportunityDetailsPage from '@/site-pages/OpportunitiesDetailsPage';
import OpportunityDetailsLoading from '@/site-pages/OpportunitiesDetailsPage/loading';

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <Box component={'main'} className="product-detail product-slides">
      <Container>
        <Suspense fallback={<OpportunityDetailsLoading />}>
          <OpportunityDetailsPage id={params?.id} />
        </Suspense>
      </Container>
    </Box>
  );
}
