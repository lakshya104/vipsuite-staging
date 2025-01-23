import React, { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import AgentEditProfilePage from '@/site-pages/AgentEditProfilePage';
import AddAddressesPageLoading from '@/site-pages/AddAddressPage/loading';
import en from '@/helpers/lang';

const VipSignupPage = async () => {
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2" gutterBottom>
          {en.agentLayout.yourProfile}
        </Typography>
        <Suspense fallback={<AddAddressesPageLoading />}>
          <AgentEditProfilePage />
        </Suspense>
      </Box>
    </Box>
  );
};

export default VipSignupPage;
