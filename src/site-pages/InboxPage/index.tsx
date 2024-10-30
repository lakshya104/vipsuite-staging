import React from 'react';
import { GetAllOrders, GetNonce } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import { isEmpty } from 'lodash';
import InboxTabs from '@/components/InboxTabs/InboxTabs';

const InboxPage = async () => {
  const nonce = await GetNonce();
  const allOrders = await GetAllOrders(nonce);
  if (!allOrders || isEmpty(allOrders)) {
    return <ErrorFallback errorMessage="No orders found" hideSubtext={true} />;
  }
  return <InboxTabs order={allOrders} />;
};

export default InboxPage;
