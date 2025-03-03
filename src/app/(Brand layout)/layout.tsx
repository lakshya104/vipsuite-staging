import React from 'react';
import HomeHeader from '@/components/Header/HomeHeader';
import HomeFooter from '@/components/HomeFooter';
import { GetSession } from '@/libs/api-manager/manager';
import ProgressProvider from '@/libs/providers/ProgressProvider';
import { UserRole } from '@/helpers/enums';
import UnauthorizedMessage from '@/components/UnauthorizedMessage';

export default async function BrandLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  const isBrand = session?.role === UserRole.Brand;
  if (!isBrand) {
    return <UnauthorizedMessage />;
  }
  return (
    <>
      <HomeHeader role={UserRole.Brand} token={session.token} />
      <ProgressProvider color="black"> {children}</ProgressProvider>
      <HomeFooter role={UserRole.Brand} />
    </>
  );
}
