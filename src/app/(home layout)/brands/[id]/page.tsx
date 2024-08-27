import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import '../Brand.scss';
import BrandDetailsPage from '@/pages/BrandDetailsPage';
import BrandDetailsPageLoading from '@/pages/BrandDetailsPage/loading';

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
