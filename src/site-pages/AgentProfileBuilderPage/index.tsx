import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import AgentProfileBuilder from '@/features/AgentProfileBuilder';
import { ProfileBuilderOptions } from '@/interfaces';
import { GetProfileBuilderContent, GetToken, GetVipProfile } from '@/libs/api-manager/manager';
import React from 'react';

interface AgentProfileBuilderPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const AgentProfileBuilderPage: React.FC<AgentProfileBuilderPageProps> = async ({ searchParams }) => {
  let profileBuilderOptions: ProfileBuilderOptions;
  let token: string;
  let profileDetails = null;

  try {
    profileBuilderOptions = await GetProfileBuilderContent();
    token = await GetToken();
    if (searchParams) profileDetails = await GetVipProfile(token, Number(searchParams?.vipId));
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to edit Profile currently." />;
  }

  if (!profileBuilderOptions || profileBuilderOptions === undefined) {
    return <ErrorFallback errorMessage="Not able to edit Profile currently." />;
  }

  return (
    <AgentProfileBuilder
      profileBuilderOptions={profileBuilderOptions}
      token={token}
      profileDetails={profileDetails?.acf}
    />
  );
};

export default AgentProfileBuilderPage;
