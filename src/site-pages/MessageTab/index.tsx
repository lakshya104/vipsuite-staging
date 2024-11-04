import React from 'react';
import { Box, Container } from '@mui/material';
import ComingSoonPage from '@/components/ComingSoon';

const MessageTab = () => {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <ComingSoonPage page="messages" />
      </Container>
    </Box>
  );
};

export default MessageTab;
