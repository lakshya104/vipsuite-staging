import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import AgentProfileBuilder from '@/features/AgentProfileBuilder';
import { ProfileBuilderOptions } from '@/interfaces';
import { GetProfileBuilderContent, GetToken } from '@/libs/api-manager/manager';
import React from 'react';

const AgentProfileBuilderPage = async () => {
  let profileBuilderOptions: ProfileBuilderOptions;
  let token: string;

  try {
    profileBuilderOptions = await GetProfileBuilderContent();
    token = await GetToken();
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }

  if (!profileBuilderOptions || profileBuilderOptions === undefined) {
    return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
  }

  return <AgentProfileBuilder profileBuilderOptions={profileBuilderOptions} token={token} />;
};

export default AgentProfileBuilderPage;
