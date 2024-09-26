import CustomLoader from '@/components/CustomLoader';
import AgentProfileBuilderPage from '@/site-pages/AgentProfileBuilderPage';
import React, { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<CustomLoader />}>
      <AgentProfileBuilderPage searchParams={searchParams} />
    </Suspense>
  );
}
