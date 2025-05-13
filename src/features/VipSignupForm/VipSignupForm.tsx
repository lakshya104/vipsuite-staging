'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import { Backdrop, Box, Button, CircularProgress, Dialog, InputAdornment, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputForm from '../../components/InputForm/InputForm';
import { defaultValues, VipSignupSchema } from '@/features/VipSignupForm/vipSignupTypes';
import { VIPSignUpFormFields } from '@/data';
import './VipSignupForm.scss';
import { VipSignUpRequestBody } from '@/interfaces/signup';
import Toaster from '@/components/Toaster';
import { VerifyEmail, VerifyEmailCode, VipSignUp } from '@/libs/api-manager/manager';
import { expiryDate, isValidEmail } from '@/helpers/utils';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import { isEqual } from 'lodash';
import { paths } from '@/helpers/paths';
import { useInstaInfo, useTiktokInfo } from '@/store/useStore';
import en from '@/helpers/lang';

const VipSignupForm = () => {
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
  const { instaInfo, clearAll: clearInstaData } = useInstaInfo();
  const { tiktokInfo, clearAll: clearTiktokData } = useTiktokInfo();
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');

  useEffect(() => {
    if (instaInfo.username) {
      updateInstagramHandle(instaInfo.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instaInfo.username]);

  const updateInstagramHandle = (username: string) => {
    reset((prevValues) => ({
      ...prevValues,
      instagram_handle: username,
    }));
  };

  useEffect(() => {
    if (tiktokInfo.username) {
      updateTiktokHandle(tiktokInfo.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiktokInfo.username]);

  const updateTiktokHandle = (username: string) => {
    reset((prevValues) => ({
      ...prevValues,
      tiktok_handle: username,
    }));
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VipSignUpRequestBody>({
    resolver: zodResolver(VipSignupSchema),
    defaultValues: defaultValues,
  });

  const clearInstaInfo = useInstaInfo((state) => state.clearAll);
  const clearTiktokInfo = useTiktokInfo((state) => state.clearAll);
  const instaHydrated = useInstaInfo((state) => state.hydrated);
  const tiktokHydrated = useTiktokInfo((state) => state.hydrated);
  const hydrated = instaHydrated && tiktokHydrated;
  const setInstaHydrated = useInstaInfo((state) => state.setHydrated);
  const setTiktokHydrated = useTiktokInfo((state) => state.setHydrated);

  useEffect(() => {
    setTimeout(() => {
      setInstaHydrated(true);
      setTiktokHydrated(true);
    }, 500);
  }, [setInstaHydrated, setTiktokHydrated]);

  useEffect(() => {
    if (hydrated) {
      clearInstaInfo();
      clearTiktokInfo();
    }
  }, [hydrated, clearInstaInfo, clearTiktokInfo]);

  const openInstagramAuth = () => {
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(
      process.env.NEXT_PUBLIC_INSTAGRAM_CALLBACK_URL,
      'InstagramAuth',
      `width=${width},height=${height},left=${left},top=${top}`,
    );
  };

  const openTikTokAuth = () => {
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(
      `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID}&response_type=code&scope=user.info.basic,user.info.stats&redirect_uri=${process.env.NEXT_PUBLIC_TIKTOK_CALLBACK_URL}`,
      'TikTokAuth',
      `width=${width},height=${height},left=${left},top=${top}`,
    );
  };

  const onSubmit = async (formData: VipSignUpRequestBody) => {
    if (!isCodeVerified) {
      setError('Please verify your email first');
      setToasterOpen(true);
    } else {
      setIsPending(true);
      setError('');
      try {
        const updatedFormData = {
          ...formData,
          instagram_follower_count: instaInfo.followers,
          instagram_access_token: instaInfo.code,
          instagram_profile_image_url: instaInfo.picture,
          instagram_token_expiry: expiryDate(instaInfo.expires),
          tiktok_follower_count: tiktokInfo.followers,
          tiktok_access_token: tiktokInfo.code,
          tiktok_refresh_token: tiktokInfo.refreshCode,
        };
        const response = await VipSignUp(updatedFormData);
        if (response?.error) {
          setError(response.error);
          setToasterOpen(true);
        } else {
          setApplicationReviewDialogOpen(true);
          reset();
          clearInstaData();
          clearTiktokData();
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
      setError(error.message);
    } else if (typeof error === 'string') {
      setError(error);
    } else {
      setError(en.signUpForm.errMessage);
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
        setError('');
        setIsCodeVerified(true);
        setIsCodeVerificationFailed(false);
        setVerifiedEmail(email);
        setToasterType('success');
        setToasterOpen(true);
        setError('Email verified successfully');
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

  const getInstagramButtonText = () => {
    if (!hydrated) {
      return en.signUpForm.loading;
    }
    if (instaInfo.code) {
      return en.signUpForm.authorisedInstagram;
    }
    return en.signUpForm.authoriseInstagram;
  };

  const getTikTokText = () => {
    if (!hydrated) {
      return en.signUpForm.loading;
    }
    if (tiktokInfo.code) {
      return en.signUpForm.authorisedTiktok;
    }
    return en.signUpForm.authoriseTiktok;
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="signup-form">
        {VIPSignUpFormFields.map(({ name, placeholder, autocomplete, type }) => (
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
                          {isVerificationLoading ? en.signUpForm.sending : en.signUpForm.emailVerify}
                        </Button>
                      )}
                      {isCodeSent && !isCodeVerified && (
                        <>
                          <InputForm
                            placeholder="Enter OTP"
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
                                handleCodeVerification(field.value);
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
                                await handleEmailVerification(field.value);
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
            {name === 'secondary_email' && (
              <Box className="input-text">
                <Typography>{en.signUpForm.addEmail}</Typography>
                <Typography>{en.signUpForm.optional}</Typography>
              </Box>
            )}
            {name === 'phone' && (
              <Box className="input-text">
                <Typography>{en.signUpForm.phoneCode}</Typography>
                <Typography>{en.signUpForm.optional}</Typography>
              </Box>
            )}
            {name === 'instagram_handle' && (
              <Box className="verify-button">
                <Button
                  className="button button--white"
                  disabled={!hydrated || !!instaInfo.code}
                  onClick={openInstagramAuth}
                >
                  {getInstagramButtonText()}
                </Button>
              </Box>
            )}
            {name === 'tiktok_handle' && (
              <Box className="verify-button">
                <Button
                  className="button button--white"
                  disabled={!hydrated || !!tiktokInfo.code}
                  onClick={openTikTokAuth}
                >
                  {getTikTokText()}
                </Button>
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
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity={toasterType} />
      <Dialog open={applicationReviewDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ApplicationReviewDialog />
      </Dialog>
    </>
  );
};

export default VipSignupForm;
