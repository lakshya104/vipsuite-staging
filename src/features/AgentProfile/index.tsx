'use client';
import React, { useState, useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import InputForm from '../../components/InputForm/InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { AgentEditProfileFields } from '@/data';
import './AgentSignupForm.scss';
import { AgentEditProfileSchema, AgentEditProfileValues } from './types';
import SelectBox from '@/components/SelectBox';
import Toaster from '@/components/Toaster';
import { AgentProfileUpdate } from '@/libs/api-manager/manager';
import { ACF } from '@/interfaces';
import { map } from 'lodash';
import { useRouter } from 'next/navigation';

interface AgentEditProfileFormProps {
  profileDetails: ACF;
  agentId: number;
  token: string;
}

const AgentEditProfileForm: React.FC<AgentEditProfileFormProps> = ({ profileDetails, agentId, token }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const router = useRouter();
  const defaultValues = {
    first_name: profileDetails.first_name || '',
    last_name: profileDetails.last_name || '',
    phone: profileDetails.phone || '',
    company_name: profileDetails.company_name || '',
    examples_of_vip_managed:
      (profileDetails.examples_of_vip_managed && map(profileDetails.examples_of_vip_managed, 'text').join(', ')) || '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AgentEditProfileValues>({
    resolver: zodResolver(AgentEditProfileSchema),
    defaultValues,
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'vip_examples',
  });

  const addAnotherVip = () => {
    append({ value: '' });
  };

  const onSubmit = async (formData: AgentEditProfileValues) => {
    setError('');
    try {
      startTransition(async () => {
        const allVipExamples = [
          formData.examples_of_vip_managed,
          ...(formData.vip_examples
            ? formData.vip_examples.map((example) => example.value.trim()).filter((value) => value !== '')
            : []),
        ]
          .filter(Boolean)
          .join(', ');

        const formDataObj = new FormData();
        formDataObj.append('first_name', formData.first_name || '');
        formDataObj.append('last_name', formData.last_name || '');
        formDataObj.append('phone', formData.phone || '');
        formDataObj.append('company_name', formData.company_name || '');
        formDataObj.append('examples_of_vip_managed', allVipExamples);
        try {
          const response = await AgentProfileUpdate(agentId, token, formDataObj);
          reset({
            first_name: '',
            last_name: '',
            phone: '',
            company_name: '',
            examples_of_vip_managed: '',
            vip_examples: [],
          });
          router.push('/my-vips');

          if (response && response.error) {
            setError(`Error: ${response.error}`);
            setToasterOpen(true);
          } else {
            reset();
          }
        } catch (error) {
          console.error('Error in AgentProfileUpdate:', error);
          handleError(error);
        }
      });
    } catch (error) {
      console.error('Error in onSubmit:', error);
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
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {AgentEditProfileFields?.map(({ name, placeholder, autocomplete, type, label, options }) => (
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
                    type={'text'}
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                    autoComplete={autocomplete}
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
        {fields?.map((field, index) => (
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
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AgentEditProfileForm;