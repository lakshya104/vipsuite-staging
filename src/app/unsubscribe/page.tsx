import React from 'react';
import UnsubscribePage from '@/site-pages/UnsubscribePage';

interface SearchParams {
  uid?: string;
  token?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: PageProps) {
  const params = await props?.searchParams;
  const token = params?.token;
  const uid = params?.uid;

  return <UnsubscribePage token={token} user_id={uid} />;
}
