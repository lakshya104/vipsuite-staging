import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CustomLoader = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        textAlign: 'center',
        gap: 2,
        bgcolor: 'background.paper',
        padding: 3,
      }}
    >
      <CircularProgress size={40} thickness={4} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default CustomLoader;
