import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import '../Brand.scss';
import BrandDetailsPageLoading from '@/sitePages/BrandDetailsPage/loading';
import BrandDetailsPage from '@/sitePages/BrandDetailsPage';

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
  const brandId = parseInt(params.id, 10);
  return (
    <Box component={'main'} className="product-detail">
      <Suspense fallback={<BrandDetailsPageLoading />}>
        <BrandDetailsPage brandId={brandId} />
      </Suspense>
    </Box>
  );
}
