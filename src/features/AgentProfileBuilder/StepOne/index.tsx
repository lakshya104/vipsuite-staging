/* eslint-disable no-unused-vars */
'use client';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputTextFormField from '@/components/InputTextFormField';
import SelectBox from '@/components/SelectBox';
import CustomStepper from '@/components/CustomStepper';
import { AgentFormValues, formSchema } from './schema';
import { CreateVipProfile, UpdateProfile } from '@/libs/api-manager/manager';
import { ACF, ProfileBuilderOptions } from '@/interfaces';
import Toaster from '@/components/Toaster';
import UseToaster from '@/hooks/useToaster';
import { agentStepOneFields } from '@/data';
import en from '@/helpers/lang';

export interface AgentProfileBuilderStepsProps {
  handleId?: (id: number) => void;
  profileBuilderOptions: ProfileBuilderOptions;
  onNext: (profileDetail: ACF) => void;
  onPrev: () => void;
  profileDetail: ACF;
  id?: number;
}
const StepOne: React.FC<AgentProfileBuilderStepsProps> = ({
  handleId,
  profileBuilderOptions,
  onNext,
  onPrev,
  profileDetail,
  id,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AgentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: profileDetail.first_name || '',
      last_name: profileDetail.last_name || '',
      type_of_representation: profileDetail.type_of_representation || '',
      instagram_handle: profileDetail.instagram_handle || '',
      tiktok_handle: profileDetail.tiktok_handle || '',
      avg_engagement: profileDetail.avg_engagement || '',
    },
  });

  const onSubmit = async (data: AgentFormValues) => {
    setIsLoading(true);
    try {
      const updatedProfileDetail: ACF = {
        ...profileDetail,
        first_name: data.first_name,
        last_name: data.last_name,
        type_of_representation: data.type_of_representation,
        avg_engagement: data.avg_engagement,
        instagram_handle: data.instagram_handle,
        tiktok_handle: data.tiktok_handle,
      };
      const profile = {
        title: `${data.first_name} ${data.last_name}`,
        acf: {
          first_name: data.first_name,
          last_name: data.last_name,
          type_of_representation: data.type_of_representation,
          avg_engagement: data.avg_engagement,
          instagram_handle: data.instagram_handle,
          tiktok_handle: data.tiktok_handle,
        },
      };
      if (id) {
        await UpdateProfile(id, profile);
      } else {
        const response = await CreateVipProfile(profile);
        if (handleId) {
          handleId(response.id);
        }
      }
      onNext(updatedProfileDetail);
    } catch (error) {
      openToaster(en.profileBuilder.vipError + error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box component="form" className="profile-builder__form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="profile-builder__head">
          <Typography variant="h2" textAlign="center">
            {en.profileBuilder.addAVip}
          </Typography>
        </Box>
        <Box className="profile-builder__body">
          {agentStepOneFields.map((field, index) => (
            <Box key={index} mb={2}>
              {field.type === 'text' ? (
                <InputTextFormField
                  placeholder={field.placeholder}
                  errors={errors}
                  control={control}
                  name={
                    field.name as
                      | 'first_name'
                      | 'last_name'
                      | 'type_of_representation'
                      | 'instagram_handle'
                      | 'tiktok_handle'
                  }
                />
              ) : (
                <SelectBox
                  name={
                    field.name as
                      | 'first_name'
                      | 'last_name'
                      | 'type_of_representation'
                      | 'instagram_handle'
                      | 'tiktok_handle'
                  }
                  control={control}
                  placeholder={field.placeholder}
                  options={profileBuilderOptions?.representation_options?.map((value) => ({ label: value, value }))}
                  label={field.label || 'select'}
                  errors={errors}
                />
              )}
            </Box>
          ))}
        </Box>
        <Box className="profile-builder__body">
          <Typography variant="h2" gutterBottom>
            {en.profileBuilder.avgEngagement}
          </Typography>
          <Typography mb={3}>{en.profileBuilder.includesocial}</Typography>
          <InputTextFormField
            name="avg_engagement"
            placeholder={en.signUpForm.avgEngagement}
            errors={errors}
            control={control}
          />
        </Box>
        <CustomStepper currentStep={1} totalSteps={6} onPrev={onPrev} />
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default StepOne;
