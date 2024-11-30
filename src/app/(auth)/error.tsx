'use client';
import React from 'react';
import Box from '@mui/material/Box';
import ErrorToaster from '@/components/ErrorToaster';

export default function Error() {
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
    </Box>
  );
}
