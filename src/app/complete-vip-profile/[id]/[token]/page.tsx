import CustomLoader from '@/components/CustomLoader';
import CompleteVipProfilePage from '@/site-pages/CompleteVipProfilePage';
import React, { Suspense } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
    token: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<CustomLoader />}>
      <CompleteVipProfilePage params={resolvedParams} />
    </Suspense>
  );
}
