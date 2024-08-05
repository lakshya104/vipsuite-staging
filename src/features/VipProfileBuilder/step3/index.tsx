'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { vipStep3formFields } from '@/data';
import SelectBox from '@/components/SelectBox';
import FormDatePicker from '@/components/FormDatePicker';
import InputTextFormField from '@/components/InputTextFormField';
import { useRouter } from 'next/navigation';
import { defaultValues, formSchema, Step3FormValues } from './schema';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string | undefined;
  options?: undefined | { value: string; label: string }[];
}

const Step3Form = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step3FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: Step3FormValues) => {
    console.log('Form data:', data);
    router.push('/vip-profile-builder/step4');
  };

  const renderFormField = ({ name, label, type, options, placeholder }: FormField) => {
    switch (type) {
      case 'select':
        return (
          <SelectBox
            name={
              name as
                | 'dateOfBirth'
                | 'birthplace'
                | 'nationality'
                | 'ethnicity'
                | 'numberOfChildren'
                | 'ageOfChild'
                | 'pets'
                | 'homePostcode'
            }
            control={control}
            placeholder={placeholder}
            options={options}
            label={label}
            errors={errors}
          />
        );
      case 'date':
        return (
          <FormDatePicker
            name={
              name as
                | 'dateOfBirth'
                | 'birthplace'
                | 'nationality'
                | 'ethnicity'
                | 'numberOfChildren'
                | 'ageOfChild'
                | 'pets'
                | 'homePostcode'
            }
            control={control}
            label={label}
          />
        );
      default:
        return (
          <InputTextFormField
            name={
              name as
                | 'dateOfBirth'
                | 'birthplace'
                | 'nationality'
                | 'ethnicity'
                | 'numberOfChildren'
                | 'ageOfChild'
                | 'pets'
                | 'homePostcode'
            }
            placeholder={placeholder}
            control={control}
            errors={errors}
          />
        );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          Your Details
        </Typography>
      </Box>
      {vipStep3formFields.map((field) => (
        <Box key={field.name} width="100%">
          {renderFormField(field)}
          {field.name === 'pets' && !errors[field.name] && (
            <Box className="input-text">
              <Typography>Separate with commas</Typography>
            </Box>
          )}
          {field.name === 'homePostcode' && !errors[field.name] && (
            <Box className="input-text">
              <Typography>You can enter the first part only e.g. EC1</Typography>
            </Box>
          )}
        </Box>
      ))}

      <CustomStepper currentStep={3} totalSteps={5} />
    </Box>
  );
};

export default Step3Form;
