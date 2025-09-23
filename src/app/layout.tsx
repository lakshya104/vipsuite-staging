import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import '../styles/globals.scss';
import ThemeRegistry from './ThemeRegistry';
import GetSessionForStatusUpdate from '@/components/GetSessionForStatusUpdate';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'THE VIP SUITE',
  description: 'By Run Ragged',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry options={{ key: 'mui-theme' }}>
            <GetSessionForStatusUpdate />
            {children}
          </ThemeRegistry>
        </AppRouterCacheProvider>
        {process.env.NEXT_PUBLIC_GTM_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTM_ID} />}
      </body>
    </html>
  );
}
