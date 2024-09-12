import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GetBrandDetails } from '@/libs/api-manager/manager';
import ReferCard from '@/components/ReferCard';
import ProductList from '@/features/ProductList';
import { BrandDetails } from '@/interfaces/brand';
import RequestItemFormButton from '@/components/RequestItemFormButton';
import ProductCardLoading from '@/components/ProductCard/ProductCardLoading';
import DetailPageImageContainer from '@/components/DetailPageImageContainer';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

interface BrandDetailsPageProps {
  brandId: number;
}

const BrandDetailsPage: React.FC<BrandDetailsPageProps> = async ({ brandId }) => {
  let brandDetails: BrandDetails | null = null;
  try {
    brandDetails = await GetBrandDetails(brandId);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Brand details not available currently." />;
  }
  if (!brandDetails) {
    return <ErrorFallback errorMessage="Brand details not available currently." />;
  }

  return (
    <Container>
      <Typography className="page-title" variant="h2" component="h1" align="center">
        {brandDetails?.title?.rendered}
      </Typography>
      <DetailPageImageContainer item={brandDetails} />
      <Typography className="product-detail__content">{brandDetails?.acf?.short_description}</Typography>
      {brandDetails?.acf?.is_lookbook_available && (
        <>
          <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
            <ReferCard
              heading={brandDetails?.acf?.lookbook_heading}
              text={brandDetails?.acf?.lookbook_description}
              href={brandDetails?.acf?.lookbook_pdf}
              isPdf={true}
            />
          </Box>
          <RequestItemFormButton />
        </>
      )}
      <Box className="product-list__page">
        <Typography variant="h2" gutterBottom>
          Products
        </Typography>
        <Suspense fallback={<ProductCardLoading />}>
          <ProductList brandId={brandDetails?.id} />
        </Suspense>
      </Box>
    </Container>
  );
};

export default BrandDetailsPage;
