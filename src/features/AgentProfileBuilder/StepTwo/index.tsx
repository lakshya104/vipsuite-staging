'use client';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputTextFormField from '@/components/InputTextFormField';
import SelectBox from '@/components/SelectBox';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import { agentFields, AgentFormValues, formSchema, representationType } from './schema';
import { AgentProfileBuilderStepsProps } from '../StepOne';

const StepTwo: React.FC<AgentProfileBuilderStepsProps> = ({ onNext, onPrev }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AgentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      typeOfRepresentation: '',
      instagram: '',
      tiktok: '',
      averageEngagement: '',
    },
  });

  const onSubmit = (data: AgentFormValues) => {
    setIsLoading(true);
    console.log(data);
    onNext(data);
    setIsLoading(false);
  };

  return (
    <>
      <Box component="form" className="profile-builder__form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="profile-builder__head">
          <Typography variant="h2" textAlign="center">
            Add a VIP
          </Typography>
        </Box>
        <Box className="profile-builder__body">
          {agentFields.map((field, index) => (
            <Box key={index} mb={2}>
              {field.type === 'text' ? (
                <InputTextFormField
                  placeholder={field.placeholder}
                  errors={errors}
                  control={control}
                  name={
                    field.name as
                      | 'firstName'
                      | 'lastName'
                      | 'typeOfRepresentation'
                      | 'instagram'
                      | 'tiktok'
                      | 'averageEngagement'
                  }
                />
              ) : (
                <SelectBox
                  name={
                    field.name as
                      | 'firstName'
                      | 'lastName'
                      | 'typeOfRepresentation'
                      | 'instagram'
                      | 'tiktok'
                      | 'averageEngagement'
                  }
                  control={control}
                  placeholder={field.placeholder}
                  options={representationType}
                  label={field.label || 'select'}
                  errors={errors}
                />
              )}
            </Box>
          ))}
        </Box>
        <Box className="profile-builder__body">
          <Typography variant="h2">Avg. engagement for Paid posts</Typography>
          <Typography>Please include both Instagram & TikTok</Typography>
          <InputTextFormField
            name="averageEngagement"
            placeholder="Avg. Engagement"
            errors={errors}
            control={control}
          />
        </Box>
        <CustomStepper currentStep={2} totalSteps={6} onPrev={onPrev} />
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default StepTwo;
