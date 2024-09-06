'use client';
import React, { useState, useTransition } from 'react';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import InputForm from '../../components/InputForm/InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import DialogBox from '@/components/Dialog/Dialog';
import { AgentSignUpFormFields } from '@/data';
import './AgentSignupForm.scss';
import { AgentSignupSchema, AgentSignupValues, defaultValues } from './agentSignupTypes';
import SelectBox from '@/components/SelectBox';
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

const AgentSignupForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);

  const handleDialogBoxDataChange = (data: boolean) => {
    setIsDialogOpen(data);
    router.push('/');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AgentSignupValues>({
    resolver: zodResolver(AgentSignupSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (formData: AgentSignupValues) => {
    setError('');
    try {
      const data = {
        ...formData,
        user_type: 'agent',
      };
      startTransition(async () => {
        try {
          const response = await VipSignUp(data);
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
        {AgentSignUpFormFields.map(({ name, placeholder, autocomplete, type, label, options }) => (
          <Box key={name}>
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
                  <InputForm
                    {...field}
                    placeholder={placeholder || ''}
                    type={name === 'password' && showPassword ? 'text' : type || 'text'}
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
        <Button type="submit" disabled={isPending} className="button button--white" fullWidth>
          {isPending ? 'Loading...' : 'Continue'}
        </Button>
      </Box>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
    </>
  );
};

export default AgentSignupForm;
