import React from 'react';
import { Box, Container } from '@mui/material';
// import Messages from '@/components/Messages';
import ComingSoonPage from '../ComingSoon';

const MessageTab = () => {
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        {/* <Messages /> */}
        <ComingSoonPage page="Messages" />
      </Container>
    </Box>
  );
};

export default MessageTab;
