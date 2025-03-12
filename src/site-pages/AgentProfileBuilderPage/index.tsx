import React from 'react';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import AgentProfileBuilder from '@/features/AgentProfileBuilder';
import { GetProfileBuilderContent, GetSession } from '@/libs/api-manager/manager';
import { isUndefined } from 'lodash';
import { UserRole } from '@/helpers/enums';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import en from '@/helpers/lang';

const AgentProfileBuilderPage = async () => {
  const [{ data: profileBuilderOptions, error }, session] = await Promise.all([
    GetProfileBuilderContent(),
    GetSession(),
  ]);
  const { role, token } = session;
  if (role !== UserRole.Agent) {
    return <UnauthorizedMessage />;
  }
  if (error) {
    return <ErrorHandler error={error} errMessage={en.agentProfileBuilder.errMessage} />;
  }
  if (!profileBuilderOptions || isUndefined(profileBuilderOptions)) {
    return <ErrorFallback errorMessage={en.agentProfileBuilder.errMessage} />;
  }
  return <AgentProfileBuilder profileBuilderOptions={profileBuilderOptions} token={token} />;
};

export default AgentProfileBuilderPage;
