import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import he from 'he';
import { DefaultImageFallback } from '@/helpers/enums';
import { isNonEmptyString } from '@/helpers/utils';

interface MessageLinkProps {
  title: string;
  imageLink: string;
  orderedFor?: string;
}

const MessageLink: React.FC<MessageLinkProps> = ({ imageLink, title, orderedFor }) => {
  return (
    <Box display="flex" alignItems="center">
      <Image
        src={imageLink || DefaultImageFallback.Placeholder}
        alt="Boda Skins Logo"
        width={110}
        height={110}
        style={{
          marginRight: 12,
        }}
      />
      <Box>
        <Typography gutterBottom variant="h6">
          {he.decode(title || '')}
        </Typography>
        {isNonEmptyString(orderedFor) && (
          <Typography gutterBottom variant="body1">
            Ordered For: {orderedFor}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MessageLink;
