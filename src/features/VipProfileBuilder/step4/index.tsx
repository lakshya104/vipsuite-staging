'use client';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { vipStep4formFields } from '@/data';
import SelectBox from '@/components/SelectBox';
import FormDatePicker from '@/components/FormDatePicker';
import InputTextFormField from '@/components/InputTextFormField';
import { useRouter } from 'next/navigation';
import { defaultValues, formSchema, Step3FormValues } from './schema';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';

type FormFieldNames =
  | 'interests'
  | 'sportsPlay'
  | 'sports'
  | 'sportsFollow'
  | 'skills'
  | 'socialLook'
  | `interests.${number}`;

const Step4Form = () => {
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
    router.push('/vip-profile-builder/step5');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          More About You...
        </Typography>
      </Box>
      {vipStep4formFields.map(({ name, label, type, options, placeholder }) => (
        <Box key={name} width="100%">
          {type === 'checkBox' ? (
            <FormGroup>
              <Box className="form-checkbox-group">
                {options &&
                  options.map((option: { value: string; label: string }) => (
                    <Box key={option.value}>
                      <Controller
                        name="interests"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="medium"
                                {...field}
                                checked={field.value && field.value.includes(option.value)}
                                onChange={() => {
                                  const newValue =
                                    field.value && field.value.includes(option.value)
                                      ? field.value.filter((value: string) => value !== option.value)
                                      : [...(field.value || []), option.value];
                                  field.onChange(newValue);
                                }}
                              />
                            }
                            label={option.label}
                          />
                        )}
                      />
                    </Box>
                  ))}
              </Box>
            </FormGroup>
          ) : type === 'select' ? (
            <SelectBox
              name={name as FormFieldNames}
              control={control}
              placeholder={placeholder}
              options={options as { value: string; label: string }[]}
              label={label}
              errors={errors}
            />
          ) : type === 'date' ? (
            <FormDatePicker name={name as FormFieldNames} control={control} label={label} />
          ) : (
            <InputTextFormField
              name={name as FormFieldNames}
              placeholder={placeholder}
              control={control}
              errors={errors}
            />
          )}
        </Box>
      ))}

      <CustomStepper currentStep={4} totalSteps={5} />
    </Box>
  );
};

export default Step4Form;
