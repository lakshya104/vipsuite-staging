import React from 'react';
import { Box, Container } from '@mui/material';
import ComingSoonPage from '@/components/ComingSoon';

export default function Page() {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <ComingSoonPage page="Help & FAQs" />
      </Container>
    </Box>
  );
}
