'use client';
import Btn from '@/components/Button/CommonBtn';
import ErrorToaster from '@/components/ErrorToaster';
import { Box } from '@mui/material';
import React from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mb={5} minHeight="50vh">
          <ErrorToaster message={error.message} errorMessage={String(error)} />
          <Btn look="dark-filled" className="button" onClick={reset}>
            Try again
          </Btn>
        </Box>
      </body>
    </html>
  );
}
