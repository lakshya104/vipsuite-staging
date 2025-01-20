import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ProgressBarLink } from '@/components/ProgressBar';
import './address.scss';
import MyAddressesPage from '@/site-pages/MyAddressesPage';
import MyAddressesPageLoading from '@/site-pages/MyAddressesPage/loading';

const AddressPage = async () => {
  return (
    <Box className="address-page">
      <Container>
        <Box className="address-page__head">
          <Typography variant="h2" align="center" component="h1">
            My Addresses
            <ProgressBarLink className="button button--black" href="/my-addresses/add">
              Add <AddIcon />
            </ProgressBarLink>
          </Typography>
        </Box>
        <Suspense fallback={<MyAddressesPageLoading />}>
          <MyAddressesPage />
        </Suspense>
      </Container>
    </Box>
  );
};

export default AddressPage;
