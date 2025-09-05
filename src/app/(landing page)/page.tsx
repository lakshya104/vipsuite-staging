import React from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ComingSoonPage from '@/site-pages/ComingSoonPage';

export default async function Page() {
  const headersList = await headers();
  const fullUrl = headersList.get('host') || '';
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    if (fullUrl.startsWith('webapp')) {
      redirect('/login');
    } else {
      return <ComingSoonPage />;
    }
  } else {
    redirect('/login');
  }
}
