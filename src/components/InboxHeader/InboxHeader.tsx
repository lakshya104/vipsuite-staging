import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import './InboxHeader.scss';
import { DefaultImageFallback } from '@/helpers/enums';

// interface InboxHeaderProps{

// }
const InboxHeader = () => {
  return (
    <Box className="inbox__header">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src={DefaultImageFallback.Placeholder}
          alt="Boda Skins Logo"
          width={60}
          height={60}
          style={{
            borderRadius: 4,
            marginRight: 12,
          }}
        />
        <Typography gutterBottom variant="h6">
          Boda Skins
        </Typography>
      </Box>
      <IconButton size="small" color="default">
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default InboxHeader;