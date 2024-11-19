import React from 'react';
import { GetAllOrders } from '@/libs/api-manager/manager';
import InboxTabs from '@/components/InboxTabs/InboxTabs';
import ErrorHandler from '@/components/ErrorHandler';

const InboxPage = async () => {
  try {
    const allOrders = await GetAllOrders();
    return <InboxTabs order={allOrders} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show Messages content currently." />;
  }
};

export default InboxPage;
