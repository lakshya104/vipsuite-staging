import React from 'react';
import { cookies } from 'next/headers';
import ErrorFallback from '@/components/ErrorFallback';
import MakeRequest from '@/features/Make-Request';
import { GetDashboardContent, GetSession } from '@/libs/api-manager/manager';
import { DashboardContent } from '@/interfaces';
import { CookieName } from '@/helpers/enums';
import { getVipId } from '@/helpers/utils';

const Page = async () => {
  const userId = cookies().get(CookieName.VipId);
  const session = await GetSession();
  const { token, role } = session;
  const vipId = getVipId(role, userId, session);
  const dashboardContent: DashboardContent = await GetDashboardContent(vipId, token);

  if (!dashboardContent || Object(dashboardContent).length === 0) {
    return <ErrorFallback errorMessage="Something went wrong." hideSubtext={true} />;
  }
  return <MakeRequest dashboardContent={dashboardContent} />;
};

export default Page;
