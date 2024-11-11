import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const MessageLink = () => {
  return (
    <Box display="flex" alignItems="center">
      <Image
        src="/img/aiavatar.png"
        alt="Boda Skins Logo"
        width={60}
        height={60}
        style={{
          marginRight: 12,
        }}
      />
      <Typography variant="h6">Boda Skins</Typography>
    </Box>
  );
};

export default MessageLink;
