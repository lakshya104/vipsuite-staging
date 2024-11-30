'use client';
import ErrorToaster from '@/components/ErrorToaster';
import { Box } from '@mui/material';
import React from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mb={5} minHeight="50vh">
          <ErrorToaster message={error.message} errorMessage={String(error)} />
        </Box>
      </body>
    </html>
  );
}
