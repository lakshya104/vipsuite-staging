import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import BrandsPage from '@/components/BrandsPage';
import { GetBrands, GetToken } from '@/libs/api-manager/manager';
import { Brand } from '@/interfaces/brand';
import ErrorToaster from '@/components/ErrorToaster';
import { get } from 'lodash';

const HomePage = async () => {
  let brands: Brand[] | null = null;
  const token = await GetToken();
  try {
    brands = await GetBrands(token);
  } catch (error) {
    const message = get(error, 'message', '');
    if ((message as string) === 'Expired token') {
      return <ErrorToaster message="Please login again to continue" login={true} errorMessage={String(error)} />;
    } else {
      return <ErrorToaster message="Not able to show brands currently!" errorMessage={String(error)} />;
    }
  }

  if (!brands) {
    return (
      <Box component={'main'} className="landing-page">
        <Container>
          <Typography align="center" variant="h4" marginTop={5}>
            Brands not found.
          </Typography>
        </Container>
      </Box>
    );
  }
  return <BrandsPage brands={brands} />;
};

export default HomePage;
