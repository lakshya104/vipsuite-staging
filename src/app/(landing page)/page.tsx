import React, { Suspense } from 'react';
import { Metadata } from 'next';
import LandingPage from '@/site-pages/LandingPage';
import LandingPageLoading from '@/site-pages/LandingPage/loading';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      metadataBase: new URL('https://vipsuite-staging.vercel.app'),
      title: 'Welcome to VIP Suite',
      description:
        'Discover a wide range of products, services, and exclusive deals on our platform. Start exploring today! Invite-only, private members portal for events, campaigns, gifting and more.',
      openGraph: {
        images: ['/img/maldives.png'],
      },
      twitter: {
        images: ['/img/maldives.png'],
      },
    };
  } catch {
    return {
      metadataBase: new URL('https://vipsuite-staging.vercel.app'),
      title: 'Welcome to VIP Suite',
      description:
        'Discover a wide range of products, services, and exclusive deals on our platform. Start exploring today! Invite-only, private members portal for events, campaigns, gifting and more.',
    };
  }
}

export default async function Page() {
  return (
    <Suspense fallback={<LandingPageLoading />}>
      <LandingPage />
    </Suspense>
  );
}
