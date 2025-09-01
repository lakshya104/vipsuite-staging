import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import '../opportunities.scss';
import '../../basket/basket.scss';
import OpportunityDetailsPage from '@/site-pages/OpportunitiesDetailsPage';
import OpportunityDetailsLoading from '@/site-pages/OpportunitiesDetailsPage/loading';

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
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
