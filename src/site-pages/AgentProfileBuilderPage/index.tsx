import React from 'react';
import ErrorHandler from '@/components/ErrorHandler';
import AgentProfileBuilder from '@/features/AgentProfileBuilder';
import { GetProfileBuilder, GetSession } from '@/libs/api-manager/manager';
import { UserRole } from '@/helpers/enums';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import en from '@/helpers/lang';

const AgentProfileBuilderPage = async () => {
  const [{ data, error }, session] = await Promise.all([GetProfileBuilder(), GetSession()]);
  const { role, token } = session;
  if (role !== UserRole.Agent) {
    return <UnauthorizedMessage />;
  }
  if (error) {
    return <ErrorHandler error={error} errMessage={en.agentProfileBuilder.errMessage} />;
  }
  return <AgentProfileBuilder profileBuilderData={data} token={token} />;
};

export default AgentProfileBuilderPage;
