'use client';
import React from 'react';
import Box from '@mui/material/Box';
import ErrorToaster from '@/components/ErrorToaster';
import Btn from '@/components/Button/CommonBtn';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mb={5} minHeight="50vh">
      <ErrorToaster message={"Failed to load page"} errorMessage={String(error)} />
      <Btn look="dark-filled" className="button" onClick={reset}>
        Try again
      </Btn>
    </Box>
  );
}
