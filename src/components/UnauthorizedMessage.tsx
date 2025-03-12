import en from '@/helpers/lang';
import { Box, Typography } from '@mui/material';
import React from 'react';

const UnauthorizedMessage = () => {
  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        variant={'h6'}
        align="center"
        sx={{
          color: 'black',
          fontWeight: '500',
          letterSpacing: '2px',
        }}
      >
        {en.unauthorizedMessage.message}
      </Typography>
    </Box>
  );
};

export default UnauthorizedMessage;
