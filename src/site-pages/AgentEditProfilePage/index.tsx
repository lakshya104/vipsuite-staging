import React from 'react';
import { GetAgentProfile, GetToken } from '@/libs/api-manager/manager';
import AgentEditProfileForm from '@/features/AgentProfile';

const AgentEditProfilePage = async () => {
  const token = await GetToken();
  const profileDetails = await GetAgentProfile(token);
  return <AgentEditProfileForm profileDetails={profileDetails.acf} agentId={profileDetails.agent_profile_id} />;
};

export default AgentEditProfilePage;
