import React, { Suspense } from 'react';
import EditAddressPage from '@/site-pages/EditAddressPage';
import AddAddressesPageLoading from '@/site-pages/AddAddressPage/loading';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params['id'];
  return (
    <Suspense fallback={<AddAddressesPageLoading type={'Edit'} />}>
      <EditAddressPage id={id} />
    </Suspense>
  );
}
