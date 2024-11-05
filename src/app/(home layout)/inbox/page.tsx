import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import InboxPage from '@/site-pages/InboxPage';
import MyOrdersLoading from '@/site-pages/InboxPage/loading';
import './inbox.scss';

interface SearchParams {
  isOrderTab?: string;
  [key: string]: string | string[] | undefined;
}

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const isOrderTab = searchParams.isOrderTab;

  return (
    <Box className="user-inbox">
      <Suspense fallback={<MyOrdersLoading isOrderTab={isOrderTab} />}>
        <InboxPage />
      </Suspense>
    </Box>
  );
}
