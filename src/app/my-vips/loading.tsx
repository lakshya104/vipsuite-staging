import React from 'react';
import MyInterestsPageLoading from '@/site-pages/MyInterestsPage/loading';
import { Box, Container, Skeleton } from '@mui/material';
import './my-vips.scss';

export default function Loading() {
  return (
    <Box className="my-vips-page">
      <Container>
        <Box className="my-vips-page__head">
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Skeleton className="page-title" variant="text" width="10%" height={45} />
            <Skeleton className="page-title" variant="text" width="10%" height={60} />
            <Skeleton className="page-title" variant="text" width="10%" height={45} />
          </Box>
        </Box>
        <MyInterestsPageLoading />
      </Container>
    </Box>
  );
}
