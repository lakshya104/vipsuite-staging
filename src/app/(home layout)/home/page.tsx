import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import './Home.scss';
import BrandsPage from '@/components/BrandsPage';
import { GetBrands } from '@/libs/api-manager/manager';
import { Brand } from '@/interfaces/brand';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';

export default async function Page() {
  let brands: Brand[] | null = null;
  try {
    brands = await GetBrands();
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Not able to show brands currently!" errorMessage={String(error)} />;
    }
  }

  console.log({brands});
  
  if (!brands) {
    return (
      <Container>
        <Typography align="center" variant="h4" marginTop={5}>
          Brands not found.
        </Typography>
      </Container>
    );
  }
  return (
    <Box component={'main'} className="landing-page">
      <Container>
        <BrandsPage brands={brands} />
      </Container>
    </Box>
  );
}
