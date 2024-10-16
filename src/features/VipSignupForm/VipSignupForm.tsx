'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Backdrop, Box, Button, CircularProgress, InputAdornment, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputForm from '../../components/InputForm/InputForm';
import { VipSignupSchema, defaultValues } from '@/features/VipSignupForm/vipSignupTypes';
import DialogBox from '@/components/Dialog';
import { VIPSignUpFormFields } from '@/data';
import './VipSignupForm.scss';
import { VipSignUpRequestBody } from '@/interfaces/signup';
import Toaster from '@/components/Toaster';
import { VipSignUp } from '@/libs/api-manager/manager';

const dialogBoxContent = {
  title: 'Thank You!',
  subTitle: 'Application in Review',
  description:
    'Thank you for your application. The concierge team will review your submission and will be in touch in due course with their decision.',
  buttonText: 'Done',
  isCrossIcon: true,
};

const VipSignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleDialogBoxDataChange = (open: boolean) => {
    setIsDialogOpen(open);
    router.push('/');
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

  const onSubmit = async (formData: VipSignUpRequestBody) => {
    setIsPending(true);
    setError('');
    try {
      const response = await VipSignUp(formData);
      setIsPending(false);
      if (response?.error) {
        setError(response.error);
        setToasterOpen(true);
      } else {
        setIsDialogOpen(true);
        reset();
      }
    } catch (error) {
      handleError(error);
      setIsPending(false);
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

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="signup-form">
        {VIPSignUpFormFields.map(({ name, label, placeholder, autocomplete, type }) => (
          <Box key={name}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <InputForm
                  {...field}
                  placeholder={placeholder}
                  label={label}
                  type={name === 'password' && showPassword ? 'text' : type}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                  autoComplete={autocomplete}
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
                      : undefined
                  }
                />
              )}
            />
            {name === 'secondary_email' && !errors[name] && (
              <Box className="input-text">
                <Typography>Add a PA or Staff Email</Typography>
                <Typography>Optional</Typography>
              </Box>
            )}
            {name === 'phone' && !errors[name] && (
              <Box className="input-text">
                <Typography>Including Country Code</Typography>
                <Typography>Optional</Typography>
              </Box>
            )}
          </Box>
        ))}
        <Button type="submit" disabled={isPending} className="button button--white" fullWidth>
          {isPending ? 'Loading...' : 'Continue'}
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
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
    </>
  );
};

export default VipSignupForm;
