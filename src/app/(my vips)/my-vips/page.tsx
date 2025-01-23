import React, { Suspense } from 'react';
import './my-vips.scss';
import MyVipPage from '@/site-pages/MyVipsPage';
import Loading from './loading';

export default async function Page(props: { searchParams?: Promise<{ accepted?: boolean }> }) {
  const searchParams = await props.searchParams;
  const isApplicationAcceptedShown = searchParams?.accepted;
  return (
    <Suspense fallback={<Loading />}>
      <MyVipPage isApplicationAcceptedShown={isApplicationAcceptedShown} />
    </Suspense>
  );
}
