'use client';
import React from 'react';
import Box from '@mui/material/Box';
import ErrorToaster from '@/components/ErrorToaster';
import en from '@/helpers/lang';

export default function Error() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mb={5} minHeight="50vh">
      <ErrorToaster
        message={en.agentLayout.errorMessages.loadFailed}
        errorMessage={en.agentLayout.errorMessages.loadFailed}
      />
    </Box>
  );
}
