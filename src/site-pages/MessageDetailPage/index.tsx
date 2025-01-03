import React from 'react';
import ErrorHandler from '@/components/ErrorHandler';
import { GetMessageDetails } from '@/libs/api-manager/manager';
import MessagesDetail from '@/components/MessagesDetail';

interface MessageDetailPageProps {
  messageId: number;
}

const MessageDetailPage: React.FC<MessageDetailPageProps> = async ({ messageId }) => {
  const { data, error } = await GetMessageDetails(messageId);
  if (error) {
    return <ErrorHandler error={error} errMessage="Not able to show Messages content currently." />;
  }
  return <MessagesDetail messageDetail={data[0]} />;
};

export default MessageDetailPage;
