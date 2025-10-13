import React from 'react';
import ErrorHandler from '@/components/ErrorHandler';
import AgentProfileBuilder from '@/features/AgentProfileBuilder';
import { GetProfileBuilder, GetSession } from '@/libs/api-manager/manager';
import { CookieName, UserRole } from '@/helpers/enums';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';
import en from '@/helpers/lang';
import { cookies } from 'next/headers';

const AgentProfileBuilderPage = async () => {
  const [{ data, error }, session, cookieStore] = await Promise.all([GetProfileBuilder(), GetSession(), cookies()]);
  const incompleteVipId = cookieStore.get(CookieName.IncompleteVipId);
  const { role, token } = session;
  if (role !== UserRole.Agent) {
    return <UnauthorizedMessage />;
  }
  if (error) {
    return <ErrorHandler error={error} errMessage={en.agentProfileBuilder.errMessage} />;
  }

  return <AgentProfileBuilder profileBuilderData={data} token={token} incompleteVipId={incompleteVipId?.value} />;
};

export default AgentProfileBuilderPage;
