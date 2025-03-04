import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import Script from 'next/script';
import '../styles/globals.scss';
import ThemeRegistry from './ThemeRegistry';

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
        <meta name="viewport" content="maximum-scale=1.0, user-scalable=no" />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GTM_ID}');
          `}
        </Script>
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
