import React, { Suspense } from 'react';
import '../Messages.scss';
import MessageDetailPage from '@/site-pages/MessageDetailPage';
import MessageDetailLoading from '@/site-pages/MessageDetailPage/loading';

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const messageId = params.id;
  return (
    <Suspense fallback={<MessageDetailLoading />}>
      <MessageDetailPage messageId={messageId} />
    </Suspense>
  );
}
