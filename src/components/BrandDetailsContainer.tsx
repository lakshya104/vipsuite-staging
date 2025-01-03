import { BrandDetails } from '@/interfaces/brand';
import { Box, Container, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import DetailPageImageContainer from './DetailPageImageContainer';
import ReferCard from './ReferCard';
import RequestItemFormButton from './RequestItemFormButton';
import ProductCardLoading from './ProductCard/ProductCardLoading';
import ProductList from '@/features/ProductList';

interface BrandDetailsContainerProps {
  brandDetails: BrandDetails;
}
const BrandDetailsContainer: React.FC<BrandDetailsContainerProps> = ({ brandDetails }) => {
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
              type="lookbook"
            />
          </Box>
          <RequestItemFormButton postId={brandDetails?.id} />
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

export default BrandDetailsContainer;
