import React from 'react';
import { GetAllOrders } from '@/libs/api-manager/manager';
import InboxTabs from '@/components/InboxTabs/InboxTabs';

const InboxPage = async () => {
  const allOrders = await GetAllOrders();
  return <InboxTabs order={allOrders} />;
};

export default InboxPage;
