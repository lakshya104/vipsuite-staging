import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GetBrandDetails, GetToken } from '@/libs/api-manager/manager';
import ReferCard from '@/components/ReferCard';
import ProductList from '@/features/ProductList';
import { BrandDetails } from '@/interfaces/brand';
import RequestItemFormButton from '@/components/RequestItemFormButton';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';
import ProductCardLoading from '@/components/ProductCard/ProductCardLoading';
import DetailPageImageContainer from '@/components/DetailPageImageContainer';

interface BrandDetailsPageProps {
  brandId: number;
}

const BrandDetailsPage: React.FC<BrandDetailsPageProps> = async ({ brandId }) => {
  let brandDetails: BrandDetails | null = null;
  const token = await GetToken();
  try {
    brandDetails = await GetBrandDetails(brandId, token);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Details not found!" errorMessage={String(error)} />;
    }
  }
  if (!brandDetails) {
    return (
      <Box component={'main'} className="product-detail">
        <Container>
          <Typography className="page-title" variant="h2" component="h1" align="center">
            Brand details not available currently.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Container>
      <Typography className="page-title" variant="h2" component="h1" align="center">
        {brandDetails.title.rendered}
      </Typography>
      <DetailPageImageContainer item={brandDetails} />
      <Typography className="product-detail__content">{brandDetails.acf.short_description}</Typography>
      <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
        <ReferCard
          heading="Spring/Summer '24 Lookbook"
          text="Download the latest Lookbook from Boda Skins to view the whole collection"
          href="/"
        />
      </Box>
      <RequestItemFormButton />
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
