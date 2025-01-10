import React from 'react';
import { Box } from '@mui/material';
import '@/styles/globals.scss';
import ProgressProvider from '@/libs/providers/ProgressProvider';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="bg-textBlack">
      <ProgressProvider color="#FFFFF7"> {children}</ProgressProvider>
    </Box>
  );
}
