import React, { Suspense } from 'react';
import '../landingPages.scss';
import VipPage from '@/site-pages/ForVip';
import VipPageLoading from '@/site-pages/ForVip/loading';

export default async function Page() {
  return (
    <Suspense fallback={<VipPageLoading />}>
      <VipPage />
    </Suspense>
  );
}
