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
import { BrandSignUp, VerifyEmail } from '@/libs/api-manager/manager';
import { isValidEmail } from '@/helpers/utils';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import { isEqual } from 'lodash';

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
  const [apiResponseCode, setApiResponseCode] = useState<number | null>(null);
  const [isCodeSent, setCodeSent] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [isCodeVerificationFailed, setIsCodeVerificationFailed] = useState<boolean>(false);
  const [previousEmail, setPreviousEmail] = useState<string>('');
  const [verifiedEmail, setVerifiedEmail] = useState<string>('');
  const [isVerificationLoading, setVerificationLoading] = useState<boolean>(false);
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
      setError('Please verify your email first');
      setToasterOpen(true);
    } else {
      setIsPending(true);
      setError('');
      try {
        const data = {
          brand_name: formData?.brand_name,
          contact_name: formData?.contact_name,
          email: formData?.email,
          phone: formData?.phone,
          password: formData?.password,
          type_of_business: formData?.type_of_business,
        };
        const response = await BrandSignUp(data);
        if (response && response.error) {
          setError(`Error: ${response.error}`);
          setIsPending(false);
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
    if (error instanceof Error) {
      setError(`Error: ${error.message}`);
    } else if (typeof error === 'string') {
      setError(`Error: ${error}`);
    } else {
      setError('Error: An unexpected error occurred during signup');
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
      if (typeof error === 'string') setError(error);
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
                      label={label}
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
                              onClick={() => handleCodeVerification(field.value.toString())}
                              disabled={isVerificationLoading}
                              className="button button--white"
                            >
                              Verify OTP
                            </Button>
                            <Button
                              onClick={() => handleEmailVerification(field.value.toString())}
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
            )}
            {name === 'phone' && !errors[name] && (
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
            href={'/login'}
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
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
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
