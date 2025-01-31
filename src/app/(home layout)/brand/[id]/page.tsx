import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import EventDetailsLoading from '@/site-pages/EventDetailsPage/loading';
import BrandDetailsPage from '@/site-pages/BrandDetailsPage';
import '../../events/Event.scss';
import { PostType } from '@/helpers/enums';

interface SearchParams {
  type?: PostType;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{ id: number }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = (await props.searchParams).type;

  return (
    <Box component={'main'} className="product-detail product-slides">
      <Container>
        <Suspense fallback={<EventDetailsLoading />}>
          <BrandDetailsPage brandId={params?.id} type={searchParams} />
        </Suspense>
      </Container>
    </Box>
  );
}
