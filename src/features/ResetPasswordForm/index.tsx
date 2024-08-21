'use client';
import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/InputForm/InputForm';
import Toaster from '@/components/Toaster';
import DialogBox from '@/components/Dialog/Dialog';
import './ResetPasswordForm.scss';
import { useRouter } from 'next/navigation';
import { ResetPassword } from '@/libs/api-manager/manager';
import { defaultValues, ResetPasswordFormValues, ResetPasswordSchema } from './schema';
import UseToaster from '@/hooks/useToaster';

const ResetPasswordForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  const dialogBoxContent = {
    title: 'Password Updated Successfully!',
    subTitle: 'Your password has been changed',
    description: 'You can now log in using your new password. If you encounter any issues, please contact support.',
    buttonText: 'Go to Login',
    isCrossIcon: true,
  };

  const handleDialogBoxDataChange = (open: boolean) => {
    setIsDialogOpen(open);
    router.push('/login');
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsPending(true);
    reset();
    try {
      const data = {
        email: values.email,
        code: values.code,
        password: values.password,
      };
      await ResetPassword(data);
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
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />
      <InputForm
        {...register('code')}
        placeholder="Reset Code"
        type="text"
        error={!!errors.code}
        helperText={errors.code?.message}
        autoComplete="one-time-code"
      />
      <InputForm
        {...register('password')}
        placeholder="New Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="new-password"
      />
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? 'Sending...' : 'Reset Password'}
      </Button>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default ResetPasswordForm;
