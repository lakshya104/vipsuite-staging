import React from 'react';
import { Box } from '@mui/material';
import '@/styles/globals.scss';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Box className="bg-textBlack">{children}</Box>;
}
