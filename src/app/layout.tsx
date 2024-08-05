import React from 'react';
import type { Metadata } from 'next';
import '../styles/globals.scss';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

export const metadata: Metadata = {
  title: 'THE VIP SUITE',
  description: 'By Run Ragged',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
