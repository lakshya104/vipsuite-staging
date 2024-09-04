import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid, Typography } from '@mui/material';
import ItemRequestForm from '@/features/ItemRequestForm';
import { GetBrandProductDetail, GetNonce, GetToken } from '@/libs/api-manager/manager';
import { BrandProductDetails } from '@/interfaces/brand';
import ErrorToaster from '@/components/ErrorToaster';
import { get, map, slice } from 'lodash';

interface ProductDetailsPageProps {
  productId: number;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ productId }) => {
  let brandProductDetails: BrandProductDetails | null = null;
  const token = await GetToken();
  const nonce = await GetNonce(token);
  try {
    brandProductDetails = await GetBrandProductDetail(productId, token);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Product Not Found!" errorMessage={String(error)} />;
    }
  }
  if (!brandProductDetails) {
    return (
      <Box className="product-details__page">
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Product Not Found
          </Typography>
        </Container>
      </Box>
    );
  }
  // const isRequestOnlyValue =
  //   brandProductDetails.meta_data.find((item) => item.key === 'is_request_only')?.value ?? false;
  const productImage = get(brandProductDetails, 'images[0].src', '/img/placeholder-image.jpg');
  const sizes =
    get(brandProductDetails, 'type') === 'variable' ? get(brandProductDetails, 'attributes[0].options', []) : [];
  const newSizes =
    get(brandProductDetails, 'type') === 'variable'
      ? map(slice(sizes, 0, 4), (size) => ({ value: size, label: size }))
      : null;
  return (
    <Box className="product-details__page">
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          {brandProductDetails?.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Image src={productImage} alt={brandProductDetails?.name} height={500} width={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              {brandProductDetails?.brand_name}
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              {brandProductDetails?.name}
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: brandProductDetails?.description }} />
            <ItemRequestForm options={newSizes} data={brandProductDetails} token={token} nonce={nonce} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailsPage;
