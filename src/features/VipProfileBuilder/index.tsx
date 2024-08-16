'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Step1Form from '@/features/VipProfileBuilder/step1';
import Step2Form from '@/features/VipProfileBuilder/step2';
import Step3Form from '@/features/VipProfileBuilder/step3';
import Step4Form from '@/features/VipProfileBuilder/step4';
import Step5Form from '@/features/VipProfileBuilder/step5';
import { ProfileBuilderOptions, ACF } from '@/interfaces';

interface ProfileBuilderInterFace {
  profileBuilderOptions: ProfileBuilderOptions;
  profileDetails: ACF;
  token: string;
  id: number;
}

const ProfileBuilder: React.FC<ProfileBuilderInterFace> = ({ profileBuilderOptions, profileDetails, token, id }) => {
  const [step, setStep] = useState(1);
  const [profileDetail, setProfileDetail] = useState(profileDetails);

  const handleNext = async (profileDetail: ACF) => {
    setProfileDetail(profileDetail);
    setStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  const handlePrev = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  if (!profileBuilderOptions) {
    return <Box>Loading....</Box>;
  }
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
          />
        );
      case 2:
        return (
          <Step2Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
          />
        );
      case 3:
        return (
          <Step3Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
          />
        );
      case 4:
        return (
          <Step4Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
          />
        );
      case 5:
        return (
          <Step5Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
          />
        );
      default:
        return (
          <Step1Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
          />
        );
    }
  };

  return <>{renderStep()}</>;
};

export default ProfileBuilder;
