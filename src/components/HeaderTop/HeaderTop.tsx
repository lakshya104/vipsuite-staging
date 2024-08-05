import React from 'react';
import { Box, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';
import './HeaderTop.scss';

const HeaderTop = () => {
  return (
    <Box className="headerTop">
      <Typography component="p" lineHeight={1.4} letterSpacing={'normal'}>
        Refer a VIP and get a gift voucher worth £50.*
        <MuiLink href="/" prefetch component={Link}>
          Find out more
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default HeaderTop;
