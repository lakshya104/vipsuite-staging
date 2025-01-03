import React, { Suspense } from 'react';
import '../Messages.scss';
import MessageDetailPage from '@/site-pages/MessageDetailPage';
import MessageDetailLoading from '@/site-pages/MessageDetailPage/loading';

export default async function Page({ params }: { params: { id: number } }) {
  const messageId = params.id;
  return (
    <Suspense fallback={<MessageDetailLoading />}>
      <MessageDetailPage messageId={messageId} />
    </Suspense>
  );
}
