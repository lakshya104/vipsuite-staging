import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid, Typography } from '@mui/material';
import ItemRequestForm from '@/features/ItemRequestForm';
import { GetBrandProductDetail, GetNonce, GetToken } from '@/libs/api-manager/manager';
import { Product } from '@/interfaces/brand';
import { get } from 'lodash';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { wrapInParagraph } from '@/helpers/utils';

interface ProductDetailsPageProps {
  productId: number;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ productId }) => {
  let product: Product | null = null;
  let token: string | null = null;
  let nonce: string | null = null;
  try {
    token = await GetToken();
    nonce = await GetNonce(token);
    product = await GetBrandProductDetail(productId);
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show product details currently." />;
  }
  if (!product) {
    return <ErrorFallback errorMessage="Not able to show product details currently." />;
  }
  const isRequestOnly = product?.meta_data.find((item) => item.key === 'is_request_only')?.value === '1' || false;

  const productImage = get(product, 'images[0].src', '/img/placeholder-image.jpg');

  const productDescription = wrapInParagraph(product?.description);
  return (
    <Box className="product-details__page">
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          {product?.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Image src={productImage} alt={product?.name} height={500} width={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              {product?.brand_name}
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              {product?.name}
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: productDescription || '' }} />
            <ItemRequestForm product={product} token={token} nonce={nonce} isRequestOnly={isRequestOnly} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailsPage;
