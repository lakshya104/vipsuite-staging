'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface ErrorFallbackProps {
  errorMessage: string;
  subtext?: string;
  hideSubtext?: boolean;
  halfHeight?: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ errorMessage, hideSubtext, subtext, halfHeight }) => {
  return (
    <Box
      sx={{
        height: halfHeight ? '30vh' : '60vh',
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
        {errorMessage}
      </Typography>
      {subtext && (
        <Typography
          variant="body1"
          align="center"
          sx={{
            color: 'gray',
            fontSize: '1.2rem',
            letterSpacing: '1px',
          }}
        >
          {subtext}
        </Typography>
      )}
      {!hideSubtext && (
        <>
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
          <Button className="button button--black" sx={{ marginTop: 3 }} onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </>
      )}
    </Box>
  );
};

export default ErrorFallback;
