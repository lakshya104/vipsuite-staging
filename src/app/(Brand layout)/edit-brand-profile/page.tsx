import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import AddAddressesPageLoading from '@/site-pages/AddAddressPage/loading';
import en from '@/helpers/lang';
import BrandEditProfilePage from '@/site-pages/BrandEditProfilePage';

export default function Page() {
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2" gutterBottom>
          {en.agentLayout.yourProfile}
        </Typography>
        <Suspense fallback={<AddAddressesPageLoading />}>
          <BrandEditProfilePage />
        </Suspense>
      </Box>
    </Box>
  );
}
