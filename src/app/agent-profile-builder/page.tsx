import CustomLoader from '@/components/CustomLoader';
import AgentProfileBuilderPage from '@/site-pages/AgentProfileBuilderPage';
import React, { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<CustomLoader />}>
      <AgentProfileBuilderPage />
    </Suspense>
  );
}
