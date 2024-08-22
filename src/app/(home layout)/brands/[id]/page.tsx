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
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
  let brandDetails: BrandDetails | null = null;
  try {
    brandDetails = await GetBrandDetails(parseInt(params.id, 10));
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
      <Container>
        <Typography align="center" variant="h4" marginTop={5}>
          Details not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h2" align="center" sx={{ py: 1 }}>
        {brandDetails.title.rendered}
      </Typography>
      <BrandContainer item={brandDetails} />
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
            <ProductList brandId={brandDetails.acf.associated_brand} />
          </Suspense>
        </Container>
      </Box>
    </Container>
  );
}

const BrandContainer = ({ item }: { item: BrandDetails }) => {
  return (
    <Card
      className="landing-product__item-inner"
      sx={{
        backgroundImage: `url(${item.acf.brand_image.sizes.large})`,
      }}
    >
      <FeedLikeIcon />
    </Card>
  );
};
