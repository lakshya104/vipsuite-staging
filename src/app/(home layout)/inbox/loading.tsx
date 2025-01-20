import React from 'react';
import MyOrdersLoading from '@/site-pages/InboxPage/loading';
import { Box } from '@mui/material';
import './inbox.scss';

export default function Loading() {
  return (
    <Box className="user-inbox">
      <MyOrdersLoading />
    </Box>
  );
}
