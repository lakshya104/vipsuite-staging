import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GetBrandDetails } from '@/libs/api-manager/manager';
import ReferCard from '@/components/ReferCard';
import ProductList from '@/features/ProductList';
import RequestItemFormButton from '@/components/RequestItemFormButton';
import ProductCardLoading from '@/components/ProductCard/ProductCardLoading';
import DetailPageImageContainer from '@/components/DetailPageImageContainer';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { auth } from '@/auth';
import { Session } from '@/interfaces';
import { cookies } from 'next/headers';

interface BrandDetailsPageProps {
  brandId: number;
  isAgent?: boolean;
}

const BrandDetailsPage: React.FC<BrandDetailsPageProps> = async ({ brandId, isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
    const brandDetails = await GetBrandDetails(brandId, token, vipId);
    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }
    if (!brandDetails) {
      return <ErrorFallback errorMessage="Brand details not available currently." />;
    }
    return (
      <Container>
        <Typography className="page-title" variant="h2" component="h1" align="center">
          {brandDetails?.title?.rendered}
        </Typography>
        <DetailPageImageContainer item={brandDetails} token={token} vipId={vipId} />
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
            <ProductList brandId={brandDetails?.id} token={token} vipId={vipId} />
          </Suspense>
        </Box>
      </Container>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Brand details not available currently." />;
  }
};

export default BrandDetailsPage;
