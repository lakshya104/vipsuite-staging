import React from 'react';
import ErrorHandler from '@/components/ErrorHandler';
import { GetMessageDetails } from '@/libs/api-manager/manager';
import MessagesDetail from '@/components/MessagesDetail';
import en from '@/helpers/lang';

interface MessageDetailPageProps {
  messageId: number;
}

const MessageDetailPage: React.FC<MessageDetailPageProps> = async ({ messageId }) => {
  const { data, error } = await GetMessageDetails(messageId);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.messageDetail.errMessage} />;
  }
  return <MessagesDetail messageDetail={data[0]} />;
};

export default MessageDetailPage;
