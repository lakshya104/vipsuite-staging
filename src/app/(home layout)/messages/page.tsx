import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import InboxPage from '@/site-pages/InboxPage';
import MyOrdersLoading from '@/site-pages/InboxPage/loading';
import './messages.scss';

export default async function Page() {
  return (
    <Box className="user-inbox">
      <Suspense fallback={<MyOrdersLoading />}>
        <InboxPage />
      </Suspense>
    </Box>
  );
}
