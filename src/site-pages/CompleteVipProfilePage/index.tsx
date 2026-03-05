import React from 'react';
import ErrorHandler from '@/components/ErrorHandler';
import CompleteVipProfileBuilder from '@/features/CompleteVipProfileBuilder';
import { GetProfileBuilder } from '@/libs/api-manager/manager';
import en from '@/helpers/lang';

interface CompleteVipProfilePageProps {
  params: {
    id: string;
    token: string;
  };
}

const CompleteVipProfilePage = async ({ params }: CompleteVipProfilePageProps) => {
  const { data, error } = await GetProfileBuilder();
  const incompleteVipId = parseInt(params.id);

  if (error) {
    return <ErrorHandler error={error} errMessage={en.agentProfileBuilder.errMessage} />;
  }

  return <CompleteVipProfileBuilder profileBuilderData={data} token={params.token} incompleteVipId={incompleteVipId} />;
};

export default CompleteVipProfilePage;
