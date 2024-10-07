import React from 'react';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { GetAgentProfile, GetToken } from '@/libs/api-manager/manager';
import AgentEditProfileForm from '@/features/AgentProfile';

const AgentEditProfilePage = async () => {
  try {
    const profileDetails = await GetAgentProfile();
    const token = await GetToken();
    if (!token) {
      return <ErrorFallback errorMessage="Not able to edit profile currently." />;
    }
    return (
      <AgentEditProfileForm
        profileDetails={profileDetails.acf}
        agentId={profileDetails.agent_profile_id}
        token={token}
      />
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit profile currently." />;
  }
};

export default AgentEditProfilePage;
