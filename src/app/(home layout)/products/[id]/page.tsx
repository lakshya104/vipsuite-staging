import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid, Typography } from '@mui/material';
import ItemRequestForm from '@/features/ItemRequestForm';
import './ProductDetails.scss';
import { GetBrandProductDetail } from '@/libs/api-manager/manager';
import { BrandProductDetails } from '@/interfaces/brand';
import type { Metadata, ResolvingMetadata } from 'next';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const product = await GetBrandProductDetail(parseInt(params.id));
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: product.title,
    description: product.short_description || product.description.slice(0, 160),
    openGraph: {
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        ...previousImages,
      ],
    },
  };
}

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
  let brandProductDetails: BrandProductDetails | null = null;
  try {
    brandProductDetails = await GetBrandProductDetail(parseInt(params.id));
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
  const productImage =
    brandProductDetails.images.find((item) => item.name === 'placeholder-image-large')?.src ??
    'https://archive.org/download/placeholder-image/placeholder-image.jpg';

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
            <Image src={productImage} alt={brandProductDetails.name} height={500} width={500} />
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
