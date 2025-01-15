'use client';
import ForgotPasswordForm from '@/features/ForgotPasswordForm';
import ResetPasswordForm from '@/features/ResetPasswordForm';
import React, { useState } from 'react';

const ChangePassword = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [userMail, setUserMail] = useState<string>('');

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  const handleUserMailChange = (mail: string) => {
    setUserMail(mail);
  };

  return activeStep === 1 ? (
    <ForgotPasswordForm handleStepChange={handleStepChange} handleUserMailChange={handleUserMailChange} />
  ) : (
    <ResetPasswordForm userMail={userMail} />
  );
};

export default ChangePassword;
