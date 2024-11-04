'use client';
import React from 'react';
import Box from '@mui/material/Box';
import ErrorToaster from '@/components/ErrorToaster';
import Btn from '@/components/Button/CommonBtn';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorPageProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="white"
      flexDirection="column"
      mb={5}
      minHeight="50vh"
    >
      <ErrorToaster message={'Unable to fetch signup content'} errorMessage={'Unable to fetch signup content'} />
      <Btn look="dark-filled" className="button" onClick={reset}>
        Try again
      </Btn>
    </Box>
  );
}
