import React from 'react';
import { GetAllVips, GetSession } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import MyVipsListing from '@/components/MyVipsListing';
import { isEmpty } from 'lodash';
import ApplicationAcceptedDialog from '@/components/ApplicationAcceptedDialog';
import { UserRole } from '@/helpers/enums';

const MyVipPage = async ({ isApplicationAcceptedShown }: { isApplicationAcceptedShown?: boolean }) => {
  const [{ data: myVips, error }, session] = await Promise.all([GetAllVips(), GetSession()]);
  if (error || !session) {
    return <ErrorHandler error={error || 'Unable to get Session'} errMessage="Unable to show VIP list currently." />;
  }
  if (isEmpty(myVips) && !isApplicationAcceptedShown) {
    return <ApplicationAcceptedDialog name={session?.first_name} role={UserRole.Agent} />;
  }
  return <MyVipsListing myVips={myVips} token={session?.token} />;
};

export default MyVipPage;
