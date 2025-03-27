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
import { VerifyEmail, VipSignUp } from '@/libs/api-manager/manager';
import { expiryDate, isValidEmail } from '@/helpers/utils';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import { isEqual } from 'lodash';
import { paths } from '@/helpers/paths';
import { useInstaInfo } from '@/store/useStore';
import en from '@/helpers/lang';

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
  const { instaInfo, clearAll } = useInstaInfo();

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
  const hydrated = useInstaInfo((state) => state.hydrated);
  const setHydrated = useInstaInfo((state) => state.setHydrated);

  useEffect(() => {
    setTimeout(() => {
      setHydrated(true);
    }, 500);
  }, [setHydrated]);

  useEffect(() => {
    if (hydrated) {
      clearInstaInfo();
    }
  }, [hydrated, clearInstaInfo]);

  const openInstagramAuth = () => {
    window.open(process.env.NEXT_PUBLIC_INSTAGRAM_CALLBACK_URL, 'InstagramAuth', 'width=600,height=600');
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
        };
        const response = await VipSignUp(updatedFormData);
        if (response?.error) {
          setError(response.error);
          setToasterOpen(true);
        } else {
          setApplicationReviewDialogOpen(true);
          reset();
          clearAll();
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
        const response = await VerifyEmail(email);
        setApiResponseCode(response.verification_code);
        setCodeSent(true);
        setPreviousEmail(email);
      } else {
        console.error(en.signUpForm.emailError);
      }
    } catch (error) {
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

  const handleCodeVerification = (email: string | undefined) => {
    if (apiResponseCode === Number(verificationCode)) {
      setError('');
      setIsCodeVerified(true);
      setIsCodeVerificationFailed(false);
      if (email) setVerifiedEmail(email);
    } else {
      setError(en.signUpForm.incorrectOtp);
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

  const getInstagramButtonText = () => {
    if (!hydrated) {
      return en.signUpForm.loading;
    }
    if (instaInfo.code) {
      return en.signUpForm.authorisedInstagram;
    }
    return en.signUpForm.authoriseInstagram;
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
                            {isVerificationLoading ? en.signUpForm.sending : en.signUpForm.resendOtp}
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
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
      <Dialog open={applicationReviewDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ApplicationReviewDialog />
      </Dialog>
    </>
  );
};

export default VipSignupForm;
