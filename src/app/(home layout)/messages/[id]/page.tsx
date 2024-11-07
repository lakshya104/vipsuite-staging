import { Box, Container, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProgressBarLink } from '@/components/ProgressBar';
import MyOrderDetailLoading from '@/site-pages/MyOrderDetailPage/loading';
import MessagesDetail from '@/components/MessagesDetail';

export default async function Page() {
  return (
    <Box className="user-inbox order-details-page">
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <ProgressBarLink href={'/inbox'} aria-label="Back to Messages">
            <ArrowBackIcon />
          </ProgressBarLink>
          Title of the message goes here
        </Typography>
        <Suspense fallback={<MyOrderDetailLoading />}>
          <MessagesDetail />
        </Suspense>
      </Container>
    </Box>
  );
}
