'use client';
import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/InputForm/InputForm';
import Toaster from '@/components/Toaster';
import DialogBox from '@/components/Dialog/Dialog';
import './ForgotPasswordForm.scss';
import { useRouter } from 'next/navigation';
import { ForgotPassword } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Link from 'next/link';

const ForgotPasswordForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [resetPasswordLink, setResetPasswordLink] = useState<string>('');
  const router = useRouter();

  const dialogBoxContent = {
    title: 'Check Your Email!',
    subTitle: 'Verification Code Sent',
    description:
      'A verification code has been sent to your email. Please enter the code on the next page to reset your password and log in.',
    buttonText: 'Got it',
    isCrossIcon: true,
  };

  const handleDialogBoxDataChange = (open: boolean) => {
    setIsDialogOpen(open);
    setIsPending(true);
    router.push(resetPasswordLink);
  };

  const ForgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  });

  type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsPending(true);
    reset();
    try {
      const data = { email: values.email };
      setResetPasswordLink(`/reset-password?email=${values.email}`);
      await ForgotPassword(data);
      setIsPending(false);
      setIsDialogOpen(true);
    } catch (error) {
      openToaster('Error during profile update. ' + error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
      <InputForm
        {...register('email')}
        placeholder="Email"
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? 'Sending...' : 'Send Password Reset'}
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
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default ForgotPasswordForm;
