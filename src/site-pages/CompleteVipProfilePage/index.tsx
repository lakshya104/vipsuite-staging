import React from 'react';
import ErrorHandler from '@/components/ErrorHandler';
import { GetProfileBuilder } from '@/libs/api-manager/manager';
import en from '@/helpers/lang';
import CompleteVipForm from '@/features/CompleteVipForm';

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

  return (
    <CompleteVipForm profileBuilderData={data} token={params.token} incompleteVipId={incompleteVipId.toString()} />
  );
};

export default CompleteVipProfilePage;
