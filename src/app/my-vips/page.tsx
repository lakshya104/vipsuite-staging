import React, { Suspense } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { ProgressBarLink } from '@/components/ProgressBar';
import AddIcon from '@mui/icons-material/Add';
import './my-vips.scss';
import MyVipPage from '@/site-pages/MyVipsPage';
import MyInterestsPageLoading from '@/site-pages/MyInterestsPage/loading';

export default function Page() {
  return (
    <Box className="my-vips-page">
      <Container>
        <Box className="my-vips-page__head">
          <Typography className="page-title" variant="h2" align="center">
            My VIPs
            <ProgressBarLink className="button button--black" href="/agent-profile-builder">
              Add <AddIcon />
            </ProgressBarLink>
          </Typography>
        </Box>
        <Suspense fallback={<MyInterestsPageLoading />}>
          <MyVipPage />
        </Suspense>
      </Container>
    </Box>
  );
}
