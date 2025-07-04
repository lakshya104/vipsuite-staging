'use client';
import React from 'react';
import { ACF, ProfileBuilderData } from '@/interfaces';
import './ProfileBuilder.scss';
import DynamicProfileBuilderStepRenderer from '../DynamicProfileBuilderStepRenderer';
import '../../components/CustomStepper/./CustomStepper.scss';

interface ProfileBuilderInterFace {
  profileDetails: ACF;
  id: number;
  token: string;
  profileBuilderData: ProfileBuilderData;
}

const ProfileBuilder: React.FC<ProfileBuilderInterFace> = ({ id, profileBuilderData, profileDetails }) => {
  return (
    <DynamicProfileBuilderStepRenderer
      profileBuilderSections={profileBuilderData}
      id={id}
      profileDetail={profileDetails}
    />
  );
};

export default ProfileBuilder;
