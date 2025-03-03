import React from 'react';
import { GetAllVips, GetSession } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import MyVipsListing from '@/components/MyVipsListing';
import { isEmpty } from 'lodash';
import ApplicationAcceptedDialog from '@/components/ApplicationAcceptedDialog';
import { CookieName, UserRole } from '@/helpers/enums';
import AgentHeader from '@/components/Header/AgentHeader';
import { cookies } from 'next/headers';
import en from '@/helpers/lang';

const MyVipPage = async () => {
  const [{ data: myVips, error }, session, cookieStore] = await Promise.all([GetAllVips(), GetSession(), cookies()]);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.myVipsPage.errMessage} />;
  }
  const isSkipped = cookieStore.get(CookieName.SkipProfile);
  if (isEmpty(myVips) && !isSkipped) {
    return <ApplicationAcceptedDialog name={session?.first_name} role={UserRole.Agent} />;
  }
  return (
    <>
      <AgentHeader token={session.token} />
      <MyVipsListing
        myVips={myVips}
        token={session?.token}
        agentId={session?.profile_id}
        agentName={session?.first_name + ' ' + session?.last_name}
      />
    </>
  );
};

export default MyVipPage;
