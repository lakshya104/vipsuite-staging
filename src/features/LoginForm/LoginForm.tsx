'use client';
import React, { useState, useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isUndefined } from 'lodash';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { login } from '@/libs/actions';
import InputForm from '@/components/InputForm/InputForm';
import { LoginFormValues, LoginSchema } from './loginTypes';
import './LoginForm.scss';
import Toaster from '@/components/Toaster';
import DialogBox from '@/components/Dialog';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const reviewDialogBoxContent = {
    title: 'Thank You!',
    subTitle: 'Application in Review',
    description:
      'Thank you for your application. The concierge team will review your submission and will be in touch in due course with their decision.',
    buttonText: 'Done',
    isCrossIcon: true,
  };
  const rejectDialogBoxContent = {
    title: 'Sorry!',
    subTitle: 'Your Application was Rejected',
    description:
      'lorem ipsum dolor sit am lorem, sed diam lorem, sed diam lorem, sed diam lorem, sed diam lorem, sed diam lore lorem, sed diam lorem.',
    buttonText: 'Done',
    isCrossIcon: true,
  };
  const handleReviewDialogBoxDataChange = (open: boolean) => {
    setIsReviewDialogOpen(open);
    router.push('/');
  };
  const handleRejectDialogBoxDataChange = (open: boolean): void => {
    setIsRejectDialogOpen(open);
    router.push('/');
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setToasterOpen(false);
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data && data.error) {
            const errorMessage = data.error;
            if (errorMessage.includes('Your account was rejected')) {
              setIsRejectDialogOpen(true);
              reset();
            } else if (errorMessage.includes('Your account is not approved')) {
              setIsReviewDialogOpen(true);
              reset();
            } else {
              setError(!isUndefined(errorMessage) ? errorMessage : 'An error occurred during login');
              setToasterOpen(true);
            }
          }
        })
        .catch((error) => {
          setError('An unexpected error occurred' + error);
          setToasterOpen(true);
        });
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="login-form">
      <InputForm
        {...register('email')}
        placeholder="Email"
        label="Email"
        type="text"
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />
      <InputForm
        {...register('password')}
        placeholder="Password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="current-password"
        InputProps={{
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
        }}
      />
      <Box className="forgot-password">
        <Typography className="forgot-password__text">
          <Link href="/forgot-password" className="forgot-password__link">
            Forgotten your password?
          </Link>
        </Typography>
      </Box>
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? 'Loading...' : 'Continue'}
      </Button>
      <Typography className="signup-text">
        Don&apos;t have an account?{' '}
        <Link
          href={'/on-boarding'}
          style={{
            textDecoration: 'underline',
            padding: 0,
            margin: 0,
            color: 'white',
          }}
        >
          Apply here
        </Link>
      </Typography>
      <DialogBox
        isDialogOpen={isReviewDialogOpen}
        onDataChange={handleReviewDialogBoxDataChange}
        content={reviewDialogBoxContent}
      />
      <DialogBox
        isDialogOpen={isRejectDialogOpen}
        onDataChange={handleRejectDialogBoxDataChange}
        content={rejectDialogBoxContent}
      />
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default LoginForm;