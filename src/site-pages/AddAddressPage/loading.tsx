import React from 'react';
import { Box, Container, Skeleton, Typography } from '@mui/material';

const AddAddressesPageLoading = () => {
  return (
    <Box className="address-form">
      <Container>
        <Box className="address-form__head">
          <Typography className="page-title" variant="h2" align="center" component="h1">
            Add Address
          </Typography>
        </Box>
        <Box component="form" className="profile-builder__form">
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />
          <Skeleton variant="rounded" height={48} sx={{ mb: 2, borderRadius: '25px' }} />

          <Box sx={{ mt: 4 }}>
            <Skeleton variant="rounded" height={48} sx={{ borderRadius: '25px' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddAddressesPageLoading;
