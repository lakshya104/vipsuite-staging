import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { DefaultImageFallback } from '@/helpers/enums';

interface MessageLinkProps {
  title: string;
  imageLink: string;
}

const MessageLink: React.FC<MessageLinkProps> = ({ imageLink, title }) => {
  return (
    <Box display="flex" alignItems="center">
      <Image
        src={imageLink || DefaultImageFallback.Placeholder}
        alt="Boda Skins Logo"
        width={60}
        height={60}
        style={{
          marginRight: 12,
        }}
      />
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

export default MessageLink;
