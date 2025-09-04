import React from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ComingSoonPage from '@/site-pages/ComingSoonPage';
import { GrantAccessObj } from '@/helpers/enums';
import { getAccessCookie } from '@/libs/actions';
import GrantAccess from '@/components/GrantAccess';

interface SearchParams {
  grantAccess?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: PageProps) {
  const headersList = await headers();
  const fullUrl = headersList.get('host') || '';
  const param = (await props.searchParams).grantAccess;
  const cookie = await getAccessCookie();
  const isGrantCookie = cookie?.value === GrantAccessObj.Value;
  if (
    process.env.NEXT_PUBLIC_NODE_ENV !== 'production' &&
    fullUrl.includes('localhost:3000') &&
    param === GrantAccessObj.Value &&
    !isGrantCookie
  ) {
    return <GrantAccess />;
  }

  // if (process.env.NEXT_PUBLIC_NODE_ENV === 'production' && fullUrl.includes('thevipsuite.co.uk')) {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production' && fullUrl.includes('vipsuite-dev') && !isGrantCookie) {
    return <ComingSoonPage />;
  } else {
    redirect('/login');
  }
}
