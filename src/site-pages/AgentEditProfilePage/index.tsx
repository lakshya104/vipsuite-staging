import React from 'react';
import { GetAgentProfile, GetToken } from '@/libs/api-manager/manager';
import AgentEditProfileForm from '@/features/AgentProfile';
import ErrorHandler from '@/components/ErrorHandler';

const AgentEditProfilePage = async () => {
  const token = await GetToken();
  const { data: profileDetails, error } = await GetAgentProfile(token);
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
  return (
    <AgentEditProfileForm profileDetails={profileDetails?.acf} agentId={profileDetails?.profile_id} token={token} />
  );
};

export default AgentEditProfilePage;
