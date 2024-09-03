import CustomLoader from '@/components/CustomLoader';
import VipProfileBuilderPage from '@/site-pages/VipProfileBuilderPage';
import React, { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<CustomLoader />}>
      <VipProfileBuilderPage />
    </Suspense>
  );
}
