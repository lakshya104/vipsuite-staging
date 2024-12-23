import React from 'react';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import AgentProfileBuilder from '@/features/AgentProfileBuilder';
import { GetProfileBuilderContent, GetToken } from '@/libs/api-manager/manager';
import { isUndefined } from 'lodash';

const AgentProfileBuilderPage = async () => {
  const [{ data: profileBuilderOptions, error }, token] = await Promise.all([GetProfileBuilderContent(), GetToken()]);
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
  if (!profileBuilderOptions || isUndefined(profileBuilderOptions)) {
    return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
  }
  return <AgentProfileBuilder profileBuilderOptions={profileBuilderOptions} token={token} />;
};

export default AgentProfileBuilderPage;
