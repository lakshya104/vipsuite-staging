import React, { Suspense } from 'react';
import './my-vips.scss';
import MyVipPage from '@/site-pages/MyVipsPage';
import Loading from './loading';

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MyVipPage />
    </Suspense>
  );
}
