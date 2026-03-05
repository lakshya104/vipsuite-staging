'use client';
import React from 'react';
import { ProfileBuilderData } from '@/interfaces';
import DynamicProfileBuilderStepRenderer from '../DynamicProfileBuilderStepRenderer';

interface ProfileBuilderInterFace {
  token: string;
  profileBuilderData: ProfileBuilderData;
  incompleteVipId: number;
}

const CompleteVipProfileBuilder: React.FC<ProfileBuilderInterFace> = ({
  token,
  profileBuilderData,
  incompleteVipId,
}) => {
  return (
    <DynamicProfileBuilderStepRenderer
      id={incompleteVipId}
      profileBuilderSections={profileBuilderData}
      token={token}
      forIncompleteVip={true}
    />
  );
};

export default CompleteVipProfileBuilder;
