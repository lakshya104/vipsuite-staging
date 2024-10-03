import React from 'react';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import AgentProfileBuilder from '@/features/AgentProfileBuilder';
import { ProfileBuilderOptions } from '@/interfaces';
import { GetProfileBuilderContent, GetToken } from '@/libs/api-manager/manager';

const AgentProfileBuilderPage = async () => {
  try {
    const profileBuilderOptions: ProfileBuilderOptions = await GetProfileBuilderContent();
    const token = await GetToken();
    if (!profileBuilderOptions || profileBuilderOptions === undefined) {
      return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
    }
    return <AgentProfileBuilder profileBuilderOptions={profileBuilderOptions} token={token} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
};

export default AgentProfileBuilderPage;
