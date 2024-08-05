'use client';
import React, { useState, useTransition } from 'react';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import InputForm from '../../components/InputForm/InputForm';
import { VipSignupSchema } from '@/features/VipSignupForm/vipSignupTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import DialogBox from '@/components/Dialog/Dialog';
import { VIPSignUpFormFields } from '@/data';
import './VipSignupForm.scss';
import { SignUpRequestBody } from '@/interfaces/signup';
import Toaster from '@/components/Toaster';
import { signup } from '@/libs/api';

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
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);

  const handleDialogBoxDataChange = (open: boolean) => {
    setIsDialogOpen(open);
    router.push('/');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequestBody>({
    resolver: zodResolver(VipSignupSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      secondary_email: '',
      phone: '',
      instagram_handle: '',
      tiktok_handle: '',
    },
  });

  const onSubmit = async (formData: SignUpRequestBody) => {
    setError('');
    try {
      const data = {
        ...formData,
        user_type: 'vip',
      };
      startTransition(async () => {
        try {
          const response = await signup(data);
          if (response && response.error) {
            setError(response.error);
            setToasterOpen(true);
          } else {
            setIsDialogOpen(true);
          }
        } catch (error) {
          handleError(error);
        }
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    console.error('Signup error:', error);
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
        {VIPSignUpFormFields.map(({ name, placeholder, autocomplete, type }) => (
          <Box key={name}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <InputForm
                  {...field}
                  placeholder={placeholder}
                  type={name === 'password' && showPassword ? 'text' : type}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                  autoComplete={autocomplete}
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
              )}
            />
            {name === 'secondary_email' && !errors[name] && (
              <Box className="input-text">
                <Typography>Add a PA or Staff Email</Typography>
                <Typography>Optional</Typography>
              </Box>
            )}
          </Box>
        ))}
        <Button type="submit" disabled={isPending} className="button button--white" fullWidth>
          {isPending ? 'Loading...' : 'Continue'}
        </Button>
      </Box>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
    </>
  );
};

export default VipSignupForm;
