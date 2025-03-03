'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import { Backdrop, Box, Button, CircularProgress, Dialog, InputAdornment, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputForm from '../../components/InputForm/InputForm';
import { VipSignupSchema, defaultValues } from '@/features/VipSignupForm/vipSignupTypes';
import { VIPSignUpFormFields } from '@/data';
import './VipSignupForm.scss';
import { VipSignUpRequestBody } from '@/interfaces/signup';
import Toaster from '@/components/Toaster';
import { VerifyEmail, VipSignUp } from '@/libs/api-manager/manager';
import { isValidEmail } from '@/helpers/utils';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import { isEqual } from 'lodash';
import { paths } from '@/helpers/paths';

const VipSignupForm = () => {
  const [error, setError] = useState<string>('');
  const [applicationReviewDialogOpen, setApplicationReviewDialogOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [apiResponseCode, setApiResponseCode] = useState<number | null>(null);
  const [isCodeSent, setCodeSent] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [isCodeVerificationFailed, setIsCodeVerificationFailed] = useState<boolean>(false);
  const [previousEmail, setPreviousEmail] = useState<string>('');
  const [verifiedEmail, setVerifiedEmail] = useState<string>('');
  const [isVerificationLoading, setVerificationLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VipSignUpRequestBody>({
    resolver: zodResolver(VipSignupSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (formData: VipSignUpRequestBody) => {
    if (!isCodeVerified) {
      setError('Please verify your email first');
      setToasterOpen(true);
    } else {
      setIsPending(true);
      setError('');
      try {
        const response = await VipSignUp(formData);
        setIsPending(true);
        if (response?.error) {
          setError(response.error);
          setToasterOpen(true);
        } else {
          setApplicationReviewDialogOpen(true);
          reset();
        }
      } catch (error) {
        handleError(error);
        setIsPending(false);
      }
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else if (typeof error === 'string') {
      setError(error);
    } else {
      setError('An unexpected error occurred during signup');
    }
    setToasterOpen(true);
  };

  const handleEmailVerification = async (email: string | undefined) => {
    try {
      setError('');
      setVerificationLoading(true);
      if (email) {
        setVerificationCode('');
        const response = await VerifyEmail(email);
        setApiResponseCode(response.verification_code);
        setCodeSent(true);
        setPreviousEmail(email);
      } else {
        console.error('Email is undefined');
      }
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      } else {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
      setToasterOpen(true);
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleCodeVerification = (email: string | undefined) => {
    if (apiResponseCode === Number(verificationCode)) {
      setError('');
      setIsCodeVerified(true);
      setIsCodeVerificationFailed(false);
      if (email) setVerifiedEmail(email);
    } else {
      setError('Your OTP is incorrect, please try again');
      setIsCodeVerified(false);
      setIsCodeVerificationFailed(true);
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
        {VIPSignUpFormFields.map(({ name, label, placeholder, autocomplete, type }) => (
          <Box key={name} className="signup__item">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <>
                  <InputForm
                    {...field}
                    placeholder={placeholder}
                    value={field.value}
                    autoFill={true}
                    label={label}
                    type={name === 'password' && showPassword ? 'text' : type}
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
                                <Box
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
                                </Box>
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
                      {!isCodeSent && field.value && isValidEmail(field.value) && (
                        <Button
                          onClick={() => handleEmailVerification(field.value)}
                          disabled={isVerificationLoading || !field.value || !isValidEmail(field.value)}
                          className="button button--white"
                        >
                          {isVerificationLoading ? 'Sending...' : 'Verify Email'}
                        </Button>
                      )}
                      {isCodeSent && !isCodeVerified && (
                        <>
                          <InputForm
                            placeholder="Enter OTP"
                            type="number"
                            value={verificationCode}
                            error={!!error}
                            helperText={error}
                            onChange={(e) => setVerificationCode(e.target.value)}
                          />
                          <Button
                            onClick={() => handleCodeVerification(field.value)}
                            disabled={isVerificationLoading}
                            className="button button--white"
                          >
                            Verify OTP
                          </Button>
                          <Button
                            onClick={() => handleEmailVerification(field.value)}
                            disabled={isVerificationLoading}
                            className="button button--white"
                          >
                            {isVerificationLoading ? 'Sending...' : 'Resend OTP'}
                          </Button>
                        </>
                      )}
                    </Box>
                  )}
                </>
              )}
            />
            {name === 'secondary_email' && (
              <Box className="input-text">
                <Typography>Add a PA or Staff Email</Typography>
                <Typography>Optional</Typography>
              </Box>
            )}
            {name === 'phone' && (
              <Box className="input-text">
                <Typography>Including the country code with + sign</Typography>
                <Typography>Optional</Typography>
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
          Continue
        </Button>

        <Typography sx={{ fontSize: '0.8rem', my: 4 }} className="onboarding__text">
          Already have an account?{' '}
          <Link
            href={paths.auth.login.getHref()}
            style={{
              textDecoration: 'underline',
              padding: 0,
              margin: 0,
              color: 'white',
            }}
          >
            Login here
          </Link>
        </Typography>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
      <Dialog open={applicationReviewDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ApplicationReviewDialog />
      </Dialog>
    </>
  );
};

export default VipSignupForm;
