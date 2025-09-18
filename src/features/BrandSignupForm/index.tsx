'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Backdrop, Box, Button, CircularProgress, Dialog, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { BrandSignUpFormFields } from '@/data';
import InputForm from '../../components/InputForm/InputForm';
import './BrandSignupForm.scss';
import { BrandSignupSchema, BrandSignupValues, defaultValues } from './types';
import SelectBox from '@/components/SelectBox';
import Toaster from '@/components/Toaster';
import { BrandSignUp, VerifyEmail, VerifyEmailCode } from '@/libs/api-manager/manager';
import { isValidEmail } from '@/helpers/utils';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import { isEqual } from 'lodash';
import { paths } from '@/helpers/paths';
import en from '@/helpers/lang';

interface BrandSignupFormProps {
  brandSignupOptions: string[];
}

const BrandSignupForm: React.FC<BrandSignupFormProps> = ({ brandSignupOptions }) => {
  const [error, setError] = useState<string>('');
  const [applicationReviewDialogOpen, setApplicationReviewDialogOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const brandOptions = brandSignupOptions.map((option) => ({
    value: option,
    label: option,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BrandSignupValues>({
    resolver: zodResolver(BrandSignupSchema),
    defaultValues,
  });

  const onSubmit = async (formData: BrandSignupValues) => {
    if (!isCodeVerified) {
      setError(en.signUpForm.verifyEmail);
      setToasterType('error');
      setToasterOpen(true);
    } else {
      setIsPending(true);
      setError('');
      try {
        const data = {
          brand_name: formData?.brand_name,
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          email: formData?.email,
          phone: formData?.phone,
          password: formData?.password,
          type_of_business: formData?.type_of_business,
        };
        const response = await BrandSignUp(data);
        if (response && response.error) {
          setError(`Error: ${response.error}`);
          setIsPending(false);
          setToasterType('error');
          setToasterOpen(true);
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
        setError('Activation code has been sent to your email');
        setCodeSent(true);
        setPreviousEmail(email);
      } else {
        setToasterType('error');
        console.error(en.signUpForm.emailError);
      }
    } catch (error) {
      setToasterType('error');
      if (typeof error === 'string') {
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
        {BrandSignUpFormFields.map(({ name, placeholder, autocomplete, type, label }) => (
          <Box key={name} className="signup__item">
            {type === 'select' ? (
              <SelectBox
                name={name}
                control={control}
                placeholder={placeholder}
                options={brandOptions}
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
                      placeholder={placeholder || ''}
                      autoFill={true}
                      value={field.value}
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
                          <Box sx={{ mt: -2 }}>
                            <InputForm
                              placeholder="Enter activation code"
                              type="number"
                              value={verificationCode}
                              error={toasterType !== 'success' && !!error}
                              helperText={toasterType !== 'success' ? error : ' '}
                              onChange={(e) => {
                                setVerificationCode(e.target.value);
                                setError('');
                              }}
                              sx={{ position: 'relative' }}
                            />
                            {toasterType !== 'error' && (
                              <Box className="input-helper">
                                <Typography>{en.signUpForm.otpHelper}</Typography>
                              </Box>
                            )}
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Button
                                onClick={() => {
                                  if (!isVerificationLoading && !isCodeVerified) {
                                    handleCodeVerification(field.value.toString());
                                  }
                                }}
                                disabled={isVerificationLoading}
                                className="button button--white"
                                sx={{ width: '80%' }}
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
                                sx={{ width: '80%', marginLeft: '0 !important' }}
                              >
                                {isResending ? 'Resending...' : en.signUpForm.resendOtp}
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}
                  </>
                )}
              />
            )}
            {name === 'phone' && (
              <Box className="input-text">
                <Typography>{en.signUpForm.phoneCode}</Typography>
                <Typography>{en.signUpForm.optional}</Typography>
              </Box>
            )}
          </Box>
        ))}
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
        <ApplicationReviewDialog isBrand={true} />
      </Dialog>
    </>
  );
};

export default BrandSignupForm;
