import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid, Typography } from '@mui/material';
import { get } from 'lodash';
import ItemRequestForm from '@/features/ItemRequestForm';
import { DefaultImageFallback } from '@/helpers/enums';
import { wrapInParagraph } from '@/helpers/utils';
import { Product } from '@/interfaces/brand';

interface ProductDetailsContainerProps {
  product: Product;
  nonce: string;
}

const ProductDetailsContainer: React.FC<ProductDetailsContainerProps> = ({ product, nonce }) => {
  const isRequestOnly = product?.meta_data.find((item) => item.key === 'is_request_only')?.value === '1' || false;
  const productImage = get(product, 'images[0].src', DefaultImageFallback.Placeholder);
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
            <ItemRequestForm product={product} nonce={nonce} isRequestOnly={isRequestOnly} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailsContainer;
