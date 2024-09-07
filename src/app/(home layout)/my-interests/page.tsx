import React, { Suspense } from 'react';
import './my-interests.scss';
import { Box, Container, Typography } from '@mui/material';
import MyInterestsPage from '@/site-pages/MyInterestsPage';
import MyInterestsPageLoading from '@/site-pages/MyInterestsPage/loading';

const MyOrders: React.FC = () => {
  return (
    <Box className="my-interests">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          My Interests
        </Typography>
        <Suspense fallback={<MyInterestsPageLoading />}>
          <MyInterestsPage />
        </Suspense>
      </Container>
    </Box>
  );
};

export default MyOrders;
