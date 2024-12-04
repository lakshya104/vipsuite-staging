import React from 'react';
import { GetAllVips, GetSession } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import MyVipsListing from '@/components/MyVipsListing';
import { MyVips } from '@/interfaces';
import { isEmpty } from 'lodash';
import ApplicationAcceptedDialog from '@/components/ApplicationAcceptedDialog';
import { UserRole } from '@/helpers/enums';

const MyVipPage = async ({ isApplicationAcceptedShown }: { isApplicationAcceptedShown?: boolean }) => {
  try {
    const session = await GetSession();
    const myVips: MyVips[] = await GetAllVips();
    if (isEmpty(myVips) && !isApplicationAcceptedShown) {
      return <ApplicationAcceptedDialog name={session.first_name} role={UserRole.Agent} />;
    }
    return <MyVipsListing myVips={myVips} token={session.token} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Unable to load your VIP list at the moment." />;
  }
};

export default MyVipPage;
