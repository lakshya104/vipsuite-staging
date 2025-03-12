'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import en from '@/helpers/lang';

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
            {en.errorFallback.refreshPage}
          </Typography>
          <Button className="button button--black" sx={{ marginTop: 3 }} onClick={() => window.location.reload()}>
            {en.errorFallback.refresh}
          </Button>
        </>
      )}
    </Box>
  );
};

export default ErrorFallback;
