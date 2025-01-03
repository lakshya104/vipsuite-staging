import React from 'react';
import { GetAllMessages, GetAllOrders } from '@/libs/api-manager/manager';
import InboxTabs from '@/components/InboxTabs/InboxTabs';
import ErrorHandler from '@/components/ErrorHandler';

interface InboxPageProps {
  currentPage: number;
}
const InboxPage: React.FC<InboxPageProps> = async ({ currentPage }) => {
  const [{ orders, totalOrders, totalPages, error: ordersError }, { data: messageData, error: messagesError }] =
    await Promise.all([GetAllOrders(currentPage), GetAllMessages()]);
  if (ordersError || messagesError) {
    return (
      <ErrorHandler error={ordersError || messagesError} errMessage="Not able to show Messages content currently." />
    );
  }
  return (
    <InboxTabs
      order={orders}
      totalOrders={totalOrders}
      totalPages={totalPages}
      currentPage={currentPage}
      messageData={messageData}
    />
  );
};

export default InboxPage;
