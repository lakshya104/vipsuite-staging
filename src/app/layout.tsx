import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import '../styles/globals.scss';
import { ProgressBar } from '@/components/ProgressBar';
import ThemeRegistry from './ThemeRegistry';

export const metadata: Metadata = {
  title: 'THE VIP SUITE',
  description: 'By Run Ragged',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
          <AppRouterCacheProvider>
            <ThemeRegistry options={{ key: 'mui-theme' }}>
              <ProgressBar>{children}</ProgressBar>
            </ThemeRegistry>
          </AppRouterCacheProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
