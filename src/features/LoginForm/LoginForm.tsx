'use client';
import React, { useState, useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/libs/actions';
import InputForm from '@/components/InputForm/InputForm';
import { LoginFormValues, LoginSchema } from './loginTypes';
import './LoginForm.scss';
import Toaster from '@/components/Toaster';
import DialogBox from '@/components/Dialog/Dialog';
import Link from 'next/link';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);

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
  };
  const handleRejectDialogBoxDataChange = (open: boolean) => {
    setIsRejectDialogOpen(open);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setError('');
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data && data.error) {
            switch (data.error) {
              case 'Error: Your account was rejected':
                setIsRejectDialogOpen(true);
                reset();
                break;
              case 'Error: Your account is not approved.':
                setIsReviewDialogOpen(true);
                reset();
                break;
              default:
                setError(data.error);
                setToasterOpen(true);
            }
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
          setError('An unexpected error occurred');
          setToasterOpen(true);
        });
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="login-form">
      <InputForm
        {...register('username')}
        placeholder="Username"
        type="text"
        error={!!errors.username}
        helperText={errors.username?.message}
        autoComplete="username"
      />
      <InputForm
        {...register('password')}
        placeholder="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="current-password"
      />
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? 'Loading...' : 'Continue'}
      </Button>
      <Typography className="signup-text">
        Don&apos;t have an account?{' '}
        <Link
          href={'/onboarding'}
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
