import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import './InboxHeader.scss';
import { DefaultImageFallback } from '@/helpers/enums';

interface InboxHeaderProps {
  image: string;
  title: string;
}
const InboxHeader: React.FC<InboxHeaderProps> = ({ image, title }) => {
  return (
    <Box className="inbox__header">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src={image || DefaultImageFallback.Placeholder}
          alt="Boda Skins Logo"
          width={110}
          height={110}
          style={{
            marginRight: 12,
          }}
        />
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
      </Box>
      <IconButton size="small" color="default">
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default InboxHeader;
