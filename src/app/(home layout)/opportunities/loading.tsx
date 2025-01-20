import React from 'react';
import OpportunitiesPageLoading from '@/site-pages/OpportunitiesPage/loading';
import { Box, Container } from '@mui/material';
import './opportunities.scss';

export default function Loading() {
  return (
    <Box className="opportunities">
      <Container>
        <OpportunitiesPageLoading />
      </Container>
    </Box>
  );
}
