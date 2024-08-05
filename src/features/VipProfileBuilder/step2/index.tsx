'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { defaultValues, FormValues, vipStep2Schema } from './schema';
import { contacts } from '@/data';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';

const Step2Form = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(vipStep2Schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    router.push('/vip-profile-builder/step3');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          Additional Contacts
        </Typography>
      </Box>

      {contacts.map(({ section, description }) => (
        <Box className="profile-builder__form-row" key={section}>
          <Typography variant="h3" gutterBottom>
            {section}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            margin="normal"
            {...register(`${section.toLowerCase()}Email` as keyof FormValues)}
            error={!!errors[`${section.toLowerCase()}Email` as keyof FormValues]}
            helperText={errors[`${section.toLowerCase()}Email` as keyof FormValues]?.message}
          />
          <TextField
            fullWidth
            placeholder="Secondary Email"
            variant="outlined"
            margin="normal"
            {...register(`${section.toLowerCase()}SecondaryEmail` as keyof FormValues)}
            error={!!errors[`${section.toLowerCase()}SecondaryEmail` as keyof FormValues]}
            helperText={errors[`${section.toLowerCase()}SecondaryEmail` as keyof FormValues]?.message}
          />
        </Box>
      ))}

      <CustomStepper currentStep={2} totalSteps={5} />
    </Box>
  );
};

export default Step2Form;
