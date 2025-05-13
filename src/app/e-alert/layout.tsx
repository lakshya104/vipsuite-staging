'use client';
import React, { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isAndroid = /android/i.test(userAgent);
    const isiOS = /iPad|iPhone|iPod/.test(userAgent);
    console.log({ userAgent, isAndroid, isiOS });

    const timer = setTimeout(() => {
      if (isAndroid) {
        window.location.href = 'https://play.google.com/store/apps/details?id=co.uk.thevipsuite.predev';
      } else if (isiOS) {
        window.location.href = 'https://apps.apple.com/app/idco.uk.thevipsuite.predev';
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
