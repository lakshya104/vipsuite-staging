'use client';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  CircularProgress,
  Backdrop,
  FormHelperText,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { filter, includes, union } from 'lodash';
import SelectBox from '@/components/SelectBox';
import FormDatePicker from '@/components/FormDatePicker';
import InputTextFormField from '@/components/InputTextFormField';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ACF, ProfileBuilderStepsProps } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { formSchema, Step4FormValues } from './schema';

type FormFieldNames =
  | 'sportsPlay'
  | 'sports'
  | 'sportsFollow'
  | 'skills'
  | 'socialLook'
  | 'habits'
  | `habits.${number}`;

const Step4Form: React.FC<ProfileBuilderStepsProps> = ({
  profileBuilderOptions,
  profileDetail,
  onNext,
  onPrev,
  id,
  isAgent,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const {
    habits_options = [],
    sports_play_options = [],
    sports_follow_options = [],
    skills_options = [],
    look_feel_of_socials_options = [],
  } = profileBuilderOptions;

  const vipStep4formFields = [
    {
      name: 'habits',
      label: 'Habits',
      type: 'checkBox',
      options: habits_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'sportsPlay',
      label: 'Sports You Play',
      type: 'select',
      options: sports_play_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'sports',
      label: 'Sports',
      type: 'text',
      placeholder: 'Other Sport',
    },
    {
      name: 'sportsFollow',
      label: 'Sports You Follow',
      type: 'select',
      options: sports_follow_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'skills',
      label: 'Skills',
      type: 'select',
      options: skills_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'socialLook',
      label: 'Look & feel of your socials',
      type: 'select',
      options: look_feel_of_socials_options.map((opt: string) => ({ value: opt, label: opt })),
    },
  ];

  const defaultValues: Step4FormValues = {
    habits: profileDetail.habits || [],
    sportsPlay: profileDetail.sports_play || '',
    sports: profileDetail.other_sports || '',
    sportsFollow: profileDetail.sports_follow || '',
    skills: profileDetail.skills || '',
    socialLook: profileDetail.look_feel_of_socials || '',
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step4FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const handleCheckboxChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any,
    optionValue: string,
  ) => {
    const newValue = includes(field.value, optionValue)
      ? filter(field.value, (value: string) => value !== optionValue)
      : union(field.value, [optionValue]);

    field.onChange(newValue);
  };
  const onSubmit = async (data: Step4FormValues) => {
    setIsLoading(true);
    try {
      const updatedProfileDetail: ACF = {
        ...profileDetail,
        habits: data.habits,
        sports_play: data.sportsPlay,
        other_sports: data.sports,
        sports_follow: data.sportsFollow,
        skills: data.skills,
        look_feel_of_socials: data.socialLook,
      };
      const profile = {
        acf: {
          first_name: profileDetail.first_name,
          last_name: profileDetail.last_name,
          habits: data.habits,
          sports_play: data.sportsPlay === '' ? null : data.sportsPlay,
          other_sports: data.sports,
          sports_follow: data.sportsFollow === '' ? null : data.sportsFollow,
          skills: data.skills === '' ? null : data.skills,
          look_feel_of_socials: data.socialLook === '' ? null : data.socialLook,
        },
      };
      await UpdateProfile(id, profile);
      onNext(updatedProfileDetail);
    } catch (error) {
      openToaster('Error during profile update. ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form step4-form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          Interested in
        </Typography>
      </Box>
      {vipStep4formFields.map(({ name, type, options }) => (
        <Box key={name} width="100%">
          {type === 'checkBox' && (
            <FormGroup>
              <Box className="form-checkbox-group">
                {options &&
                  options.map((option: { value: string; label: string }) => (
                    <Box key={option.value}>
                      <Controller
                        name={name as FormFieldNames}
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <input
                                type="checkbox"
                                {...field}
                                checked={field.value?.includes(option.value)}
                                onChange={() => handleCheckboxChange(field, option.value)}
                              />
                            }
                            label={option.label}
                          />
                        )}
                      />
                    </Box>
                  ))}
              </Box>
              <FormHelperText error>{errors[name as keyof Step4FormValues]?.message}</FormHelperText>
            </FormGroup>
          )}
        </Box>
      ))}
      {vipStep4formFields.map(({ name, label, type, options, placeholder }) => (
        <Box key={name} width="100%">
          {type === 'select' ? (
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
            type === 'text' && (
              <InputTextFormField
                name={name as FormFieldNames}
                placeholder={placeholder}
                control={control}
                errors={errors}
              />
            )
          )}
        </Box>
      ))}
      <CustomStepper currentStep={isAgent ? 5 : 4} totalSteps={isAgent ? 6 : 5} onPrev={onPrev} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default Step4Form;
