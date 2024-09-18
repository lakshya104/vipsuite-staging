'use client';
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const AgentProfileBuilder = () => {
  const [step, setStep] = useState(1);
  const [profileDetail, setProfileDetail] = useState('');
  const user = useCurrentUser();
  const token = user?.token;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNext = async (profileDetail: any) => {
    setProfileDetail(profileDetail);
    setStep((prevStep) => Math.min(prevStep + 1, 6));
  };

  const handlePrev = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne profileDetail={profileDetail} token={token} onNext={handleNext} onPrev={handlePrev} />;
      case 2:
        return <StepTwo profileDetail={profileDetail} token={token} onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <StepOne profileDetail={profileDetail} token={token} onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <StepOne profileDetail={profileDetail} token={token} onNext={handleNext} onPrev={handlePrev} />;
      case 5:
        return <StepOne profileDetail={profileDetail} token={token} onNext={handleNext} onPrev={handlePrev} />;
      case 6:
        return <StepOne profileDetail={profileDetail} token={token} onNext={handleNext} onPrev={handlePrev} />;
      default:
        return <StepOne profileDetail={profileDetail} token={token} onNext={handleNext} onPrev={handlePrev} />;
    }
  };
  return <>{renderStep()}</>;
};

export default AgentProfileBuilder;
