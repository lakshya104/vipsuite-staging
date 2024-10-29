import React from 'react';
import { GetAgentProfile } from '@/libs/api-manager/manager';
import AgentEditProfileForm from '@/features/AgentProfile';

const AgentEditProfilePage = async () => {
  const profileDetails = await GetAgentProfile();
  return <AgentEditProfileForm profileDetails={profileDetails.acf} agentId={profileDetails.agent_profile_id} />;
};

export default AgentEditProfilePage;
