import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import InboxPage from '@/site-pages/InboxPage';
import MyOrdersLoading from '@/site-pages/InboxPage/loading';
import './inbox.scss';

interface SearchParams {
  isOrderTab?: string;
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const isOrderTab = searchParams.isOrderTab;
  const currentPage = parseInt(searchParams.page || '1', 10);
  return (
    <Box className="user-inbox">
      <Suspense fallback={<MyOrdersLoading isOrderTab={isOrderTab} />}>
        <InboxPage currentPage={currentPage} />
      </Suspense>
    </Box>
  );
}
