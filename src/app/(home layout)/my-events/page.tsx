import React, { FC, Suspense } from 'react';
import { Typography, Container, Box } from '@mui/material';
import './event.scss';
import MyEventsPage from '@/site-pages/MyEventsPage';
import MyEventsPageLoading from '@/site-pages/MyEventsPage/loading';

const MyOrders: FC = () => {
  return (
    <Box className="my-events">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          My Events
        </Typography>
        <Suspense fallback={<MyEventsPageLoading />}>
          <MyEventsPage />
        </Suspense>
      </Container>
    </Box>
  );
};

export default MyOrders;
