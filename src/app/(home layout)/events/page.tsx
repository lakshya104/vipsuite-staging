import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './Event.scss';
import EventsPage from '@/site-pages/EventsPage';
import EventsPageLoading from '@/site-pages/EventsPage/loading';

interface SearchParams {
  search?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search;
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <Suspense fallback={<EventsPageLoading />}>
          <EventsPage search={search} />
        </Suspense>
      </Container>
    </Box>
  );
}
