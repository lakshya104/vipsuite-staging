import React from 'react';
import { Box, Container } from '@mui/material';
import Messages from '@/components/Messages';

const MessageTab = () => {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <Messages />
      </Container>
    </Box>
  );
};

export default MessageTab;
