import * as React from 'react';
import { Box, Typography } from '@mui/material';
import AgentProfile from '@/features/AgentProfile';
import { GetAgentProfile, GetToken } from '@/libs/api-manager/manager';

const VipSignupPage = async () => {
  const profileDetails = await GetAgentProfile();
  const token = await GetToken();

  return (
    <Box className="signup__page">
      <Box flexGrow={1} className="signup__page-inner">
        <Typography variant="h2">Your Profile</Typography>
        <AgentProfile profileDetails={profileDetails.acf} agentId={profileDetails.agent_profile_id} token={token} />
      </Box>
    </Box>
  );
};

export default VipSignupPage;
