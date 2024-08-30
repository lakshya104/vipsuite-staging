import React, { Suspense } from 'react';
import EditAddressPage from '@/site-pages/EditAddressPage';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params['id'];

  return (
    <Suspense>
      <EditAddressPage id={id} />
    </Suspense>
  );
}
