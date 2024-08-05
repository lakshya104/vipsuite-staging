import * as React from 'react';
import { Box, Typography } from '@mui/material';
import VipSignupForm from '@/features/VipSignupForm/VipSignupForm';

const VipSignupPage = () => {
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Apply as a VIP</Typography>
        <Typography component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </Typography>
        <VipSignupForm />
      </Box>
    </Box>
  );
};

export default VipSignupPage;
