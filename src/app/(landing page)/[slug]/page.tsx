import React, { Suspense } from 'react';
import LandingSlugPage from '@/site-pages/LandingSlugPage';
import LandingSlugPageLoading from '@/site-pages/LandingSlugPage/loading';
import '../landingPages.scss';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { slug } = params;
  return (
    <Suspense fallback={<LandingSlugPageLoading />}>
      <LandingSlugPage slug={slug} />
    </Suspense>
  );
}
