'use client';
import React, { useEffect, useState } from 'react';
import Step1Form from '@/features/VipProfileBuilder/step1';
import Step2Form from '@/features/VipProfileBuilder/step2';
import Step3Form from '@/features/VipProfileBuilder/step3';
import Step4Form from '@/features/VipProfileBuilder/step4';
import Step5Form from '@/features/VipProfileBuilder/step5';
import { ProfileBuilderOptions, ACF } from '@/interfaces';
import { isEmpty, size } from 'lodash';
import CustomLoader from '@/components/CustomLoader';
import { useSearchParams } from 'next/navigation';

interface ProfileBuilderInterFace {
  profileBuilderOptions: ProfileBuilderOptions;
  profileDetails: ACF;
  id: number;
}

const ProfileBuilder: React.FC<ProfileBuilderInterFace> = ({ profileBuilderOptions, profileDetails, id }) => {
  const [step, setStep] = useState(1);
  const [profileDetail, setProfileDetail] = useState(profileDetails);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get('profile-route');

  useEffect(() => {
    if (isProfileEdit) {
      setStep(1);
    } else if (size(profileDetails.look_feel_of_socials) > 0) {
      setStep(5);
    } else if (size(profileDetails.home_post_code) > 0) {
      setStep(4);
    } else if (!isEmpty(profileDetails.known_for)) {
      setStep(2);
    }
    setLoading(false);
  }, [profileDetails, isProfileEdit]);

  const handleNext = async (profileDetail: ACF) => {
    setProfileDetail(profileDetail);
    setStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  const handlePrev = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  if (!profileBuilderOptions || loading) {
    return <CustomLoader />;
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
            id={id}
          />
        );
    }
  };

  return <>{renderStep()}</>;
};

export default ProfileBuilder;
