import React from 'react';
import { GetAllOrders } from '@/libs/api-manager/manager';
import InboxTabs from '@/components/InboxTabs/InboxTabs';
import ErrorHandler from '@/components/ErrorHandler';

interface InboxPageProps {
  currentPage: number;
}
const InboxPage: React.FC<InboxPageProps> = async ({ currentPage }) => {
  try {
    const { orders, totalOrders, totalPages } = await GetAllOrders(currentPage);
    return <InboxTabs order={orders} totalOrders={totalOrders} totalPages={totalPages} currentPage={currentPage} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show Messages content currently." />;
  }
};

export default InboxPage;
