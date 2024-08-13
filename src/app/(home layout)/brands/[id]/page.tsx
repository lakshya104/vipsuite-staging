import React, { Suspense } from 'react';
import { Box, Card, Container, Typography } from '@mui/material';
import { GetBrandDetails } from '@/libs/api-manager/manager';
import FeedLikeIcon from '@/components/FeedLikeIcon';
import '../Brand.scss';
import ReferCard from '@/components/ReferCard';
import ProductList from '@/features/ProductList';
import { BrandDetails } from '@/interfaces/brand';
import RequestItemFormButton from '@/components/RequestItemFormButton';
import CustomLoader from '@/components/CustomLoader';

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
  const brandDetails: BrandDetails = await GetBrandDetails(parseInt(params.id, 10));

  return (
    <Box sx={{ pb: 8 }}>
      <Container>
        <Typography variant="h2" align="center" sx={{ py: 1 }}>
          {brandDetails.title.rendered}
        </Typography>
        <BrandContainer />
        <Typography sx={{ py: 2 }}>{brandDetails.acf.short_description}</Typography>
        <ReferCard
          heading="Spring/Summer '24 Lookbook"
          text="Download the latest Lookbook from Boda Skins to view the whole collection"
          href="/"
        />
        <RequestItemFormButton />
        <Box className="product-list__page">
          <Container>
            <Typography variant="h2" gutterBottom>
              Products
            </Typography>
            <Suspense fallback={<CustomLoader />}>
              <ProductList brandId={brandDetails.id} />
            </Suspense>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}

const BrandContainer = () => {
  return (
    <Card
      className="landing-product__item-inner"
      sx={{
        backgroundImage: `url(/img/bodaSkins.png)`,
      }}
    >
      <FeedLikeIcon />
    </Card>
  );
};
