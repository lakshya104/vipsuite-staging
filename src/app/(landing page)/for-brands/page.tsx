import React, { Suspense } from 'react';
import '../landingPages.scss';
import BrandsPage from '@/site-pages/ForBrands';
import BrandsPageLoading from '@/site-pages/ForBrands/loading';
export default async function Page() {
  return (
    <Suspense fallback={<BrandsPageLoading />}>
      <BrandsPage />
    </Suspense>
  );
}
