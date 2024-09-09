'use client';
import React, { useState, useTransition } from 'react';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import InputForm from '../../components/InputForm/InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import DialogBox from '@/components/Dialog/Dialog';
import { AgentSignUpFormFields } from '@/data';
import './AgentSignupForm.scss';
import { AgentSignupSchema, AgentSignupValues, defaultValues } from './types';
import SelectBox from '@/components/SelectBox';
import Toaster from '@/components/Toaster';
import { AgentSignUp } from '@/libs/api-manager/manager';

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

  const onSubmit = async (formData: AgentSignupValues) => {
    setError('');
    try {
      startTransition(async () => {
        try {
          const allVipExamples = [
            formData.examples_of_vip_managed,
            ...formData.vip_examples.map((example) => example.value.trim()).filter((value) => value !== ''),
          ]
            .filter(Boolean)
            .join(', ');

          const data = {
            first_name: formData?.first_name,
            last_name: formData?.last_name,
            email: formData?.email,
            password: formData?.password,
            phone: formData?.phone,
            company_name: formData?.company_name,
            type_of_representation: formData.type_of_representation,
            examples_of_vip_managed: allVipExamples,
          };
          const response = await AgentSignUp(data);
          if (response && response.error) {
            setError(`Error: ${response.error}`);
            setToasterOpen(true);
          } else {
            reset();
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
      setError(`Error: ${error.message}`);
    } else if (typeof error === 'string') {
      setError(`Error: ${error}`);
    } else {
      setError('Error: An unexpected error occurred during signup');
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
            {name === 'examples_of_vip_managed' && !errors[name] && (
              <Box className="input-text" sx={{ cursor: 'pointer' }} onClick={addAnotherVip}>
                <Typography sx={{ textDecoration: 'underline' }}>Add Another Vip</Typography>
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
                error={!!errors.vip_examples?.[index]?.value}
                helperText={errors.vip_examples?.[index]?.value?.message}
              />
            )}
          />
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
