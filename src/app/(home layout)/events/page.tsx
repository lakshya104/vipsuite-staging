import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './Event.scss';
import EventsPage from '@/site-pages/EventsPage';
import EventsPageLoading from '@/site-pages/EventsPage/loading';

interface SearchParams {
  page?: string;
  search?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || '1', 10);
  const search = searchParams?.search;
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <Suspense fallback={<EventsPageLoading />}>
          <EventsPage currentPage={page} search={search} />
        </Suspense>
      </Container>
    </Box>
  );
}
