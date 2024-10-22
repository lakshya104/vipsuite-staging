import React, { Suspense } from 'react';
import LandingSlugPage from '@/site-pages/LandingSlugPage';
import LandingSlugPageLoading from '@/site-pages/LandingSlugPage/loading';
import '../landingPages.scss';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  return (
    <Suspense fallback={<LandingSlugPageLoading />}>
      <LandingSlugPage slug={slug} />
    </Suspense>
  );
}
