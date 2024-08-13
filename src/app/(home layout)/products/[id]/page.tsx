import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid, Typography } from '@mui/material';
import ItemRequestForm from '@/features/ItemRequestForm';
import './ProductDetails.scss';
import { GetBrandProductDetail } from '@/libs/api-manager/manager';
import { BrandProductDetails } from '@/interfaces/brand';

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
  const brandProductDetails: BrandProductDetails = await GetBrandProductDetail(parseInt(params.id));
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

  const sizes = brandProductDetails.type === 'variable' ? brandProductDetails.attributes[0].options : [];
  const newSizes =
    brandProductDetails.type === 'variable'
      ? sizes.slice(0, 4).map((size: string) => ({ value: size, label: size }))
      : null;
  return (
    <Box className="product-details__page">
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          {brandProductDetails.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Image src="/img/product_1.jpg" alt={brandProductDetails.name} height={500} width={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              {brandProductDetails.name}
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              {brandProductDetails.name}
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: brandProductDetails.description }} />
            <ItemRequestForm options={newSizes} data={brandProductDetails} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
