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
import CustomStepper from '@/components/CustomStepper';
import '../ProfileBuilder.scss';
import { ACF, ProfileBuilderStepsProps } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { formSchema, Step4FormValues } from './schema';
import en from '@/helpers/lang';
import { QuestionType } from '@/helpers/enums';

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
      label: en.profileBuilder.typeOfContent.placeholders.habits,
      type: QuestionType.CheckBoxes,
      options: habits_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'sportsPlay',
      label: en.profileBuilder.typeOfContent.placeholders.sportsPlay,
      type: QuestionType.Dropdown,
      options: sports_play_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'sportsFollow',
      label: en.profileBuilder.typeOfContent.placeholders.sportsFollow,
      type: QuestionType.Dropdown,
      options: sports_follow_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'skills',
      label: en.profileBuilder.typeOfContent.placeholders.skills,
      type: QuestionType.Dropdown,
      options: skills_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'socialLook',
      label: en.profileBuilder.typeOfContent.placeholders.lookFeelOfSocials,
      type: QuestionType.Dropdown,
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
          sports_follow: data.sportsFollow === '' ? null : data.sportsFollow,
          skills: data.skills === '' ? null : data.skills,
          look_feel_of_socials: data.socialLook === '' ? null : data.socialLook,
        },
      };
      await UpdateProfile(id, profile);
      onNext(updatedProfileDetail);
    } catch (error) {
      openToaster(en.profileBuilder.errorMessage + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form step4-form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          {en.profileBuilder.typeOfContent.title}
        </Typography>
      </Box>
      {vipStep4formFields.map(({ name, type, options, label }) => (
        <Box key={name} width="100%">
          {type === QuestionType.CheckBoxes ? (
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
          ) : (
            <SelectBox
              name={name as FormFieldNames}
              control={control}
              options={options as { value: string; label: string }[]}
              label={label}
              errors={errors}
            />
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
