import * as React from 'react';
import { Box, Typography } from '@mui/material';
import AgentSignupForm from '@/features/AgentSignupForm/AgentSignupForm';
import { SignupContent } from '@/interfaces/signup';
import { GetSignupContent } from '@/libs/api-manager/manager';

const VipSignupPage = async () => {
  const signupContent: SignupContent = await GetSignupContent();
  const agentSignupContent = signupContent.agent_intro_copy;
  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Apply as an Agent</Typography>
        <Typography component="p">{agentSignupContent}</Typography>
        <AgentSignupForm />
      </Box>
    </Box>
  );
};

export default VipSignupPage;
