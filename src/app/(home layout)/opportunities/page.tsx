import React, { Suspense } from 'react';
import { Box, Container } from '@mui/material';
import './opportunities.scss';
import OpportunitiesPage from '@/site-pages/OpportunitiesPage';
import OpportunitiesPageLoading from '@/site-pages/OpportunitiesPage/loading';

interface SearchParams {
  opportunityCategory?: string;
  page?: string;
  search?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const opportunityCategory = searchParams?.opportunityCategory;
  const page = parseInt(searchParams?.page || '1', 10);
  const search = searchParams?.search;
  return (
    <Box className="opportunities">
      <Container>
        <Suspense fallback={<OpportunitiesPageLoading />}>
          <OpportunitiesPage opportunityCategory={opportunityCategory} currentPage={page} search={search} />
        </Suspense>
      </Container>
    </Box>
  );
}
