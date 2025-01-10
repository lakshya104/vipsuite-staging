import React, { Suspense } from 'react';
import './my-vips.scss';
import MyVipPage from '@/site-pages/MyVipsPage';
import Loading from './loading';

export default function Page({ searchParams }: { searchParams?: { accepted?: boolean } }) {
  const isApplicationAcceptedShown = searchParams?.accepted;
  return (
    <Suspense fallback={<Loading />}>
      <MyVipPage isApplicationAcceptedShown={isApplicationAcceptedShown} />
    </Suspense>
  );
}
