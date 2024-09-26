'use client';
import React, { useEffect, useState } from 'react';
import StepOne from './StepOne';
import { ProfileBuilderOptions, ACF } from '@/interfaces';
import Step2Form from '../VipProfileBuilder/step2';
import Step1Form from '../VipProfileBuilder/step1';
import Step3Form from '../VipProfileBuilder/step3';
import Step4Form from '../VipProfileBuilder/step4';
import Step5Form from '../VipProfileBuilder/step5';
import { useSearchParams } from 'next/navigation';

interface ProfileBuilderInterFace {
  profileBuilderOptions: ProfileBuilderOptions;
  token: string;
  profileDetails: ACF | undefined;
}

const AgentProfileBuilder: React.FC<ProfileBuilderInterFace> = ({ profileBuilderOptions, token, profileDetails }) => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState<number>(0);
  const [profileDetail, setProfileDetail] = useState<ACF>(
    profileDetails ? profileDetails : { first_name: '', last_name: '' },
  );
  const searchParams = useSearchParams();
  const isEditVip = searchParams.get('vipId');

  useEffect(() => {
    if (isEditVip) {
      setId(Number(isEditVip));
    }
  }, [isEditVip]);

  const handleNext = async (profileDetail: ACF) => {
    setProfileDetail(profileDetail);
    setStep((prevStep) => Math.min(prevStep + 1, 6));
  };

  const handleId = (id: number) => {
    setId(id);
  };
  const handlePrev = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            handleId={handleId}
            profileBuilderOptions={profileBuilderOptions}
            token={token}
            onNext={handleNext}
            onPrev={handlePrev}
            profileDetail={profileDetail}
            id={id}
          />
        );
      case 2:
        return (
          <Step1Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
            isAgent={true}
          />
        );
      case 3:
        return (
          <Step2Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
            isAgent={true}
          />
        );
      case 4:
        return (
          <Step3Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
            isAgent={true}
          />
        );
      case 5:
        return (
          <Step4Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
            isAgent={true}
          />
        );
      case 6:
        return (
          <Step5Form
            profileBuilderOptions={profileBuilderOptions}
            profileDetail={profileDetail}
            onNext={handleNext}
            onPrev={handlePrev}
            token={token}
            id={id}
            isAgent={true}
          />
        );
      default:
        return (
          <StepOne
            handleId={handleId}
            profileBuilderOptions={profileBuilderOptions}
            token={token}
            onNext={handleNext}
            onPrev={handlePrev}
            profileDetail={profileDetail}
            id={id}
          />
        );
    }
  };
  return <>{renderStep()}</>;
};

export default AgentProfileBuilder;
