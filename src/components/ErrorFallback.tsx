import React from 'react';
import { Box, Typography } from '@mui/material';

interface ErrorFallbackProps {
  errorMessage: string;
  hideSubtext?: boolean;
  smallHeight?: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ errorMessage, hideSubtext, smallHeight }) => {
  return (
    <Box
      component="main"
      sx={{
        height: smallHeight ? '20vh' : '40vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        variant={smallHeight ? 'h6' : 'h5'}
        align="center"
        sx={{
          color: 'black',
          fontWeight: '500',
          letterSpacing: '2px',
        }}
      >
        {errorMessage}
      </Typography>
      {!hideSubtext && (
        <Typography
          variant="body1"
          align="center"
          sx={{
            color: 'gray',
            fontSize: '1.2rem',
            letterSpacing: '1px',
          }}
        >
          Please try refreshing the page or come back later.
        </Typography>
      )}
    </Box>
  );
};

export default ErrorFallback;
