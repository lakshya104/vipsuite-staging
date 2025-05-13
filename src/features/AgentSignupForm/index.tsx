'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Backdrop, Box, Button, CircularProgress, Dialog, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputForm from '../../components/InputForm/InputForm';
import { AgentSignUpFormFields } from '@/data';
import './AgentSignupForm.scss';
import { AgentSignupSchema, AgentSignupValues, defaultValues } from './types';
import SelectBox from '@/components/SelectBox';
import Toaster from '@/components/Toaster';
import { AgentSignUp, VerifyEmail, VerifyEmailCode } from '@/libs/api-manager/manager';
import { isValidEmail } from '@/helpers/utils';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import { isEqual } from 'lodash';
import { paths } from '@/helpers/paths';
import en from '@/helpers/lang';

const AgentSignupForm = () => {
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [applicationReviewDialogOpen, setApplicationReviewDialogOpen] = useState<boolean>(false);
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isCodeSent, setCodeSent] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [isCodeVerificationFailed, setIsCodeVerificationFailed] = useState<boolean>(false);
  const [previousEmail, setPreviousEmail] = useState<string>('');
  const [verifiedEmail, setVerifiedEmail] = useState<string>('');
  const [isVerificationLoading, setVerificationLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AgentSignupValues>({
    resolver: zodResolver(AgentSignupSchema),
    defaultValues,
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'vip_examples',
  });

  const addAnotherVip = () => {
    append({ value: '' });
  };

  // eslint-disable-next-line no-unused-vars
  const onSubmit: (formData: AgentSignupValues) => Promise<void> = async (formData) => {
    if (!isCodeVerified) {
      setError(en.signUpForm.verifyEmail);
      setToasterOpen(true);
    } else {
      setIsPending(true);
      setError('');
      try {
        const allVipExamples = [
          formData.examples_of_vip_managed,
          ...formData.vip_examples.map((example) => example.value.trim()).filter((value) => value !== ''),
        ].filter(Boolean);

        const data = {
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          email: formData?.email,
          password: formData?.password,
          phone: formData?.phone,
          company_name: formData?.company_name,
          examples_of_vip_managed: allVipExamples,
        };
        const response = await AgentSignUp(data);
        if (response && response.error) {
          setError(`Error: ${response.error}`);
          setToasterOpen(true);
          setIsPending(false);
        } else {
          reset();
          setApplicationReviewDialogOpen(true);
        }
      } catch (error) {
        handleError(error);
        setIsPending(false);
      }
    }
  };

  const handleError = (error: unknown) => {
    setToasterType('error');
    if (error instanceof Error) {
      setError(`Error: ${error.message}`);
    } else if (typeof error === 'string') {
      setError(`Error: ${error}`);
    } else {
      setError(`Error: ${en.signUpForm.errMessage}`);
    }
    setToasterOpen(true);
  };

  const handleEmailVerification = async (email: string | undefined) => {
    try {
      setError('');
      setVerificationLoading(true);
      if (email) {
        setVerificationCode('');
        await VerifyEmail(email);
        setToasterType('success');
        setToasterOpen(true);
        setError('OTP has been sent to your email');
        setCodeSent(true);
        setPreviousEmail(email);
      } else {
        setToasterType('error');
        console.error(en.signUpForm.emailError);
      }
    } catch (error) {
      if (typeof error === 'string') {
        setToasterType('error');
        setError(error);
      } else {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(en.signUpForm.unexpectedError);
        }
      }
      setToasterOpen(true);
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleCodeVerification = async (email: string | undefined) => {
    if (email) {
      try {
        setVerificationLoading(true);
        await VerifyEmailCode(email, verificationCode);
        setToasterType('success');
        setToasterOpen(true);
        setError('Email verified successfully');
        setIsCodeVerified(true);
        setIsCodeVerificationFailed(false);
        setVerifiedEmail(email);
      } catch (error) {
        setToasterType('error');
        setError(error instanceof Error ? error.message : en.signUpForm.incorrectOtp);
        setToasterOpen(true);
        setIsCodeVerified(false);
        setIsCodeVerificationFailed(true);
      } finally {
        setVerificationLoading(false);
      }
    }
  };

  const handleEmailChange = (email: string) => {
    if (isEqual(email, verifiedEmail) && email.length > 1) {
      setCodeSent(true);
      setIsCodeVerified(true);
    } else if (isEqual(email, previousEmail) && email.length > 1) {
      setCodeSent(true);
    } else {
      setCodeSent(false);
      setIsCodeVerified(false);
      setIsCodeVerificationFailed(false);
      setError('');
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="signup-form">
        {AgentSignUpFormFields.map(({ name, placeholder, autocomplete, type, label, options }) => (
          <Box key={name} className="signup__item">
            {type === 'select' ? (
              <SelectBox
                name={name}
                control={control}
                placeholder={placeholder}
                options={options}
                label={label || 'select'}
                errors={errors}
              />
            ) : (
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <>
                    <InputForm
                      {...field}
                      autoFill={true}
                      value={field.value}
                      placeholder={placeholder || ''}
                      type={name === 'password' && showPassword ? 'text' : type || 'text'}
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                      autoComplete={autocomplete}
                      onChange={(e) => {
                        field.onChange(e);
                        if (name === 'email') handleEmailChange(e.target.value);
                      }}
                      InputProps={
                        name === 'password'
                          ? {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Button
                                    sx={{
                                      p: 0,
                                      m: 0,
                                      minWidth: 'auto',
                                      width: 'auto',
                                      height: 'auto',
                                    }}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                  >
                                    {showPassword ? (
                                      <VisibilityOffIcon sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
                                    ) : (
                                      <RemoveRedEyeIcon sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
                                    )}
                                  </Button>
                                </InputAdornment>
                              ),
                            }
                          : name === 'email'
                            ? {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Box
                                      sx={{
                                        p: 0,
                                        m: 0,
                                        minWidth: 'auto',
                                        width: 'auto',
                                        height: 'auto',
                                      }}
                                    >
                                      {isCodeVerified && <DoneIcon sx={{ color: 'white' }} />}
                                    </Box>
                                  </InputAdornment>
                                ),
                              }
                            : undefined
                      }
                    />
                    {name === 'email' && (
                      <Box className="verify-button">
                        {!isCodeSent && field.value && isValidEmail(field.value.toString()) && (
                          <Button
                            onClick={() => handleEmailVerification(field.value.toString())}
                            disabled={isVerificationLoading || !field.value || !isValidEmail(field.value.toString())}
                            className="button button--white"
                          >
                            {isVerificationLoading ? en.signUpForm.sending : en.signUpForm.emailVerify}
                          </Button>
                        )}
                        {isCodeSent && !isCodeVerified && (
                          <>
                            <InputForm
                              placeholder={en.signUpForm.enterOtp}
                              type="number"
                              value={verificationCode}
                              error={toasterType !== 'success' && !!error}
                              helperText={toasterType !== 'success' ? error : ' '}
                              onChange={(e) => {
                                setVerificationCode(e.target.value);
                                setError('');
                              }}
                            />
                            <Button
                              onClick={() => {
                                if (!isVerificationLoading && !isCodeVerified) {
                                  handleCodeVerification(field.value.toString());
                                }
                              }}
                              disabled={isVerificationLoading}
                              className="button button--white"
                            >
                              {isVerificationLoading && !isResending ? 'Verifying...' : en.signUpForm.verifyOtp}
                            </Button>
                            <Button
                              onClick={async () => {
                                if (!isResending) {
                                  setIsResending(true);
                                  await handleEmailVerification(field.value.toString());
                                  setIsResending(false);
                                }
                              }}
                              disabled={isResending || isVerificationLoading}
                              className="button button--white"
                            >
                              {isResending ? 'Resending...' : en.signUpForm.resendOtp}
                            </Button>
                          </>
                        )}
                      </Box>
                    )}
                  </>
                )}
              />
            )}
            {name === 'company_name' && (
              <Box className="input-text company-name">
                <Typography>{en.signUpForm.optional}</Typography>
              </Box>
            )}
            {name === 'phone' && (
              <Box className="input-text">
                <Typography>{en.signUpForm.phoneCode}</Typography>
                <Typography>{en.signUpForm.optional}</Typography>
              </Box>
            )}
          </Box>
        ))}

        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`vip_examples.${index}.value`}
            control={control}
            render={({ field }) => (
              <InputForm
                type={''}
                {...field}
                placeholder={en.signUpForm.vipExamples}
                label={en.signUpForm.vipExamples}
                error={!!errors.vip_examples?.[index]?.value}
                helperText={errors.vip_examples?.[index]?.value?.message}
              />
            )}
          />
        ))}
        <Box sx={{ cursor: 'pointer' }} onClick={addAnotherVip}>
          <Box className="input-text">
            <Typography sx={{ textDecoration: 'underline' }}>{en.signUpForm.addVip}</Typography>
          </Box>
        </Box>
        <Button
          type="submit"
          disabled={isPending || isCodeVerificationFailed}
          className="button button--white"
          fullWidth
        >
          {en.signUpForm.continue}
        </Button>
        <Typography sx={{ fontSize: '0.8rem', my: 4 }} className="onboarding__text">
          {en.signUpForm.alreadyAccount}{' '}
          <Link
            href={paths.auth.login.getHref()}
            style={{
              textDecoration: 'underline',
              padding: 0,
              margin: 0,
              color: 'white',
            }}
          >
            {en.signUpForm.login}
          </Link>
        </Typography>
      </Box>
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity={toasterType} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={applicationReviewDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ApplicationReviewDialog />
      </Dialog>
    </>
  );
};

export default AgentSignupForm;
