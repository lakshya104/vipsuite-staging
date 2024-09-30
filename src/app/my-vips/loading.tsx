import React from 'react';
import MyInterestsPageLoading from '@/site-pages/MyInterestsPage/loading';
import { Box, Container, Typography } from '@mui/material';
import { ProgressBarLink } from '@/components/ProgressBar';
import AddIcon from '@mui/icons-material/Add';
import './my-vips.scss';

export default function Loading() {
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
        <MyInterestsPageLoading />
      </Container>
    </Box>
  );
}
