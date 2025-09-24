import React from 'react';
import { get } from 'lodash';
import { Typography } from '@mui/material';
import AgentSignupForm from '@/features/AgentSignupForm';
import { SignupContent } from '@/interfaces';
import { GetSignupContent } from '@/libs/api-manager/manager';

const AgentSignupPage = async () => {
  const signupContent: SignupContent = await GetSignupContent();
  const agentSignupContent = get(signupContent, 'agent_intro_copy', '');
  return (
    <>
      <Typography component="p" sx={{ color: '#a4a49f !important' }}>
        {agentSignupContent}
      </Typography>
      <AgentSignupForm />
    </>
  );
};

export default AgentSignupPage;
