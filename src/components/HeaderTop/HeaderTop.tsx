import React from 'react';
import { Box, Typography } from '@mui/material';
import './HeaderTop.scss';

interface HeaderTopProps {
  text: string;
}
const HeaderTop: React.FC<HeaderTopProps> = ({ text }) => {
  return (
    <Box className="headerTop">
      <Typography component="p" lineHeight={1.4} letterSpacing={'normal'}>
        {text}
      </Typography>
    </Box>
  );
};

export default HeaderTop;
