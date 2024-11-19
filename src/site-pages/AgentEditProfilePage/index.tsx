import React from 'react';
import { GetAgentProfile, GetToken } from '@/libs/api-manager/manager';
import AgentEditProfileForm from '@/features/AgentProfile';
import ErrorHandler from '@/components/ErrorHandler';

const AgentEditProfilePage = async () => {
  try {
    const token = await GetToken();
    const profileDetails = await GetAgentProfile(token);
    return (
      <AgentEditProfileForm
        profileDetails={profileDetails.acf}
        agentId={profileDetails.agent_profile_id}
        token={token}
      />
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
};

export default AgentEditProfilePage;
