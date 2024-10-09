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
import { useEditVipIdStore } from '@/store/useStore';
import { GetVipProfile } from '@/libs/api-manager/manager';
import CustomLoader from '@/components/CustomLoader';
import BackToHome from '@/components/BackToHome';

interface ProfileBuilderInterFace {
  profileBuilderOptions: ProfileBuilderOptions;
  token: string;
}

const AgentProfileBuilder: React.FC<ProfileBuilderInterFace> = ({ profileBuilderOptions, token }) => {
  const [step, setStep] = useState(1);
  const [profileDetail, setProfileDetail] = useState<ACF>({ first_name: '', last_name: '' });
  const searchParams = useSearchParams();
  const isEditVip = searchParams.get('edit');
  const { editVipId } = useEditVipIdStore();
  const [id, setId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeProfile = async () => {
      setIsLoading(true);
      if (isEditVip && editVipId) {
        const numericId = Number(editVipId);
        setId(numericId);
        await fetchVipProfile(numericId);
      } else {
        setId(0);
        setProfileDetail({ first_name: '', last_name: '' });
      }
      setIsLoading(false);
    };

    initializeProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditVip, editVipId]);

  const fetchVipProfile = async (profileId: number) => {
    try {
      const response = await GetVipProfile(token, profileId);
      setProfileDetail(response.acf);
    } catch {
      setProfileDetail({ first_name: '', last_name: '' });
    }
  };

  const handleNext = async (updatedProfileDetail: ACF) => {
    setProfileDetail(updatedProfileDetail);
    setStep((prevStep) => Math.min(prevStep + 1, 6));
  };

  const handleId = (newId: number) => {
    setId(newId);
  };

  const handlePrev = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };
  if (isLoading) {
    return <CustomLoader />;
  }

  const renderStep = () => {
    const commonProps = {
      profileBuilderOptions,
      profileDetail,
      onNext: handleNext,
      onPrev: handlePrev,
      token,
      id,
      isAgent: true,
    };

    switch (step) {
      case 1:
        return <StepOne handleId={handleId} {...commonProps} />;
      case 2:
        return <Step1Form {...commonProps} />;
      case 3:
        return <Step2Form {...commonProps} />;
      case 4:
        return <Step3Form {...commonProps} />;
      case 5:
        return <Step4Form {...commonProps} />;
      case 6:
        return <Step5Form {...commonProps} />;
      default:
        return <StepOne handleId={handleId} {...commonProps} />;
    }
  };

  return (
    <>
      {profileDetail?.first_name !== '' && <BackToHome />}
      {renderStep()}
    </>
  );
};

export default AgentProfileBuilder;
