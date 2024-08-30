import AddAddressPage from '@/site-pages/AddAddressPage';
import AddAddressesPageLoading from '@/site-pages/AddAddressPage/loading';
import React, { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<AddAddressesPageLoading type={'Add'} />}>
      <AddAddressPage />
    </Suspense>
  );
}
