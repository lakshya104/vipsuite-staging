import * as React from 'react';
import { Box, Typography } from '@mui/material';
import AgentSignupForm from '@/features/AgentSignupForm/AgentSignupForm';

const VipSignupPage = () => {
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Apply as an Agent</Typography>
        <Typography component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </Typography>
        <AgentSignupForm />
      </Box>
    </Box>
  );
};

export default VipSignupPage;
