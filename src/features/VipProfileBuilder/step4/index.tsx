'use client';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBox from '@/components/SelectBox';
import FormDatePicker from '@/components/FormDatePicker';
import InputTextFormField from '@/components/InputTextFormField';
import { formSchema, Step4FormValues } from './schema';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ACF, ProfileBuilderStepsProps } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import { removeEmptyStrings } from '@/helpers/utils';

type FormFieldNames = 'interests' | 'sportsPlay' | 'sports' | 'sportsFollow' | 'skills' | 'socialLook';

const Step4Form: React.FC<ProfileBuilderStepsProps> = ({
  profileBuilderOptions,
  profileDetail,
  onNext,
  onPrev,
  token,
  id,
}) => {
  // Map options from profileBuilderOptions
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

  // Default values populated from profileDetail
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

  const onSubmit = async (data: Step4FormValues) => {
    console.log('Form data:', data);

    const updatedProfileDetail: ACF = {
      ...profileDetail,
      habits: data.habits,
      sports_play: data.sportsPlay,
      other_sports: data.sports,
      sports_follow: data.sportsFollow,
      skills: data.skills,
      look_feel_of_socials: data.socialLook,
    };

    console.log('updatedProfileDetail:', updatedProfileDetail);
    await UpdateProfile(id, token, removeEmptyStrings(updatedProfileDetail));
    onNext(updatedProfileDetail);
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
                        name={name as FormFieldNames}
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="medium"
                                {...field}
                                checked={field.value.includes(option.value)}
                                onChange={() => {
                                  const newValue = field.value.includes(option.value)
                                    ? field.value.filter((value: string) => value !== option.value)
                                    : [...field.value, option.value];
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

      <CustomStepper currentStep={4} totalSteps={5} onPrev={onPrev} />
    </Box>
  );
};

export default Step4Form;
