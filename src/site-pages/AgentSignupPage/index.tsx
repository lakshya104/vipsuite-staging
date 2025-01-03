import AgentSignupForm from '@/features/AgentSignupForm';
import { SignupContent } from '@/interfaces';
import { GetSignupContent } from '@/libs/api-manager/manager';
import { Typography } from '@mui/material';
import { get } from 'lodash';
import React from 'react';

const AgentSignupPage = async () => {
  const signupContent: SignupContent = await GetSignupContent();
  const agentSignupContent = get(signupContent, 'agent_intro_copy', '');
  return (
    <>
      <Typography component="p">{agentSignupContent}</Typography>
      <AgentSignupForm />
    </>
  );
};

export default AgentSignupPage;
