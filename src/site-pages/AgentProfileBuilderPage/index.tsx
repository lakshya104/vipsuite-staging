import React from 'react';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import AgentProfileBuilder from '@/features/AgentProfileBuilder';
import { GetProfileBuilderContent, GetSession } from '@/libs/api-manager/manager';
import { isUndefined } from 'lodash';
import { UserRole } from '@/helpers/enums';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';

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
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }
  if (!profileBuilderOptions || isUndefined(profileBuilderOptions)) {
    return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
  }
  return <AgentProfileBuilder profileBuilderOptions={profileBuilderOptions} token={token} />;
};

export default AgentProfileBuilderPage;
