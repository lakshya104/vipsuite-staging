import React from 'react';
import { GetAllOrders, GetNonce } from '@/libs/api-manager/manager';
import InboxTabs from '@/components/InboxTabs/InboxTabs';

const InboxPage = async () => {
  const nonce = await GetNonce();
  const allOrders = await GetAllOrders(nonce);
  return <InboxTabs order={allOrders} />
};

export default InboxPage;
