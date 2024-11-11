'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Backdrop, Box, Button, CircularProgress, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DialogBox from '@/components/Dialog';
import InputForm from '../../components/InputForm/InputForm';
import { AgentSignUpFormFields } from '@/data';
import './AgentSignupForm.scss';
import { AgentSignupSchema, AgentSignupValues, defaultValues } from './types';
import SelectBox from '@/components/SelectBox';
import Toaster from '@/components/Toaster';
import { AgentSignUp, VerifyEmail } from '@/libs/api-manager/manager';
import { isValidEmail } from '@/helpers/utils';

const dialogBoxContent = {
  title: 'Thank You!',
  subTitle: 'Application in Review',
  description:
    'Thank you for your application. The concierge team will review your submission and will be in touch in due course with their decision.',
  buttonText: 'Done',
  isCrossIcon: true,
};

const AgentSignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [apiResponseCode, setApiResponseCode] = useState<number | null>(null);
  const [isCodeSent, setCodeSent] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [isCodeVerificationFailed, setIsCodeVerificationFailed] = useState<boolean>(false);

  const handleDialogBoxDataChange = (data: boolean) => {
    setIsDialogOpen(data);
    router.push('/');
  };

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
      setError('Please verify your email first');
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
        setIsPending(false);
        if (response && response.error) {
          setError(`Error: ${response.error}`);
          setToasterOpen(true);
        } else {
          reset();
          setIsDialogOpen(true);
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
      setIsPending(true);
      if (email) {
        setVerificationCode('');
        const response = await VerifyEmail(email);
        setApiResponseCode(response.verification_code);
        setCodeSent(true);
      } else {
        console.error('Email is undefined');
      }
    } catch (error) {
      if (typeof error === 'string') setError(error);
      setToasterOpen(true);
    } finally {
      setIsPending(false);
    }
  };

  const handleCodeVerification = () => {
    if (apiResponseCode === Number(verificationCode)) {
      setError('');
      setIsCodeVerified(true);
      setIsCodeVerificationFailed(false);
    } else {
      setError('Your OTP is incorrect, please try again');
      setIsCodeVerified(false);
      setIsCodeVerificationFailed(true);
    }
  };

  const handleEmailChange = () => {
    setVerificationCode('');
    setCodeSent(false);
    setIsCodeVerified(false);
    setIsCodeVerificationFailed(false);
    setApiResponseCode(null);
    setError('');
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
                      label={placeholder}
                      type={name === 'password' && showPassword ? 'text' : type || 'text'}
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                      autoComplete={autocomplete}
                      onChange={(e) => {
                        field.onChange(e);
                        if (name === 'email') handleEmailChange();
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
                          : undefined
                      }
                    />
                    {name === 'email' && (
                      <Box className="verify-button">
                        {!isCodeSent && (
                          <Button
                            onClick={() => handleEmailVerification(field.value.toString())}
                            disabled={isPending || !field.value || !isValidEmail(field.value.toString())}
                            className="button verify-btn"
                          >
                            Verify Email
                          </Button>
                        )}
                        {isCodeSent && !isCodeVerified && (
                          <>
                            <Button
                              onClick={() => handleEmailVerification(field.value.toString())}
                              disabled={isPending}
                              className="button resend-btn"
                            >
                              Resend OTP
                            </Button>
                            <InputForm
                              placeholder="Enter OTP"
                              type="number"
                              value={verificationCode}
                              error={!!error}
                              helperText={error}
                              onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <Button onClick={handleCodeVerification} disabled={isPending} className="button submit-btn">
                              Submit
                            </Button>
                          </>
                        )}
                        {isCodeVerified && (
                          <Box
                            className="input-text"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={1}
                          >
                            <Typography>Email Verified</Typography>
                            <DoneIcon sx={{ color: 'green' }} />
                          </Box>
                        )}
                      </Box>
                    )}
                  </>
                )}
              />
            )}
            {name === 'company_name' && !errors[name] && (
              <Box className="input-text">
                <Typography>Add a PA or Staff Email</Typography>
                <Typography>Optional</Typography>
              </Box>
            )}
            {name === 'phone' && !errors[name] && (
              <Box className="input-text">
                <Typography>Including Country Code</Typography>
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
                placeholder={`Example of VIP Managed`}
                label={`Example of VIP Managed`}
                error={!!errors.vip_examples?.[index]?.value}
                helperText={errors.vip_examples?.[index]?.value?.message}
              />
            )}
          />
        ))}
        <Box sx={{ cursor: 'pointer' }} onClick={addAnotherVip}>
          <Box className="input-text">
            <Typography sx={{ textDecoration: 'underline' }}>Add Another Vip</Typography>
          </Box>
        </Box>
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
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AgentSignupForm;
