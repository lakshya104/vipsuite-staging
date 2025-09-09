'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../../components/InputForm/InputForm';
import { AgentEditProfileFields } from '@/data';
import './AgentSignupForm.scss';
import { AgentEditProfileSchema, AgentEditProfileValues } from './types';
import SelectBox from '@/components/SelectBox';
import Toaster from '@/components/Toaster';
import { AgentProfileUpdate } from '@/libs/api-manager/manager';
import { ACF, AgentEditFormDataObject } from '@/interfaces';
import revalidatePathAction from '@/libs/actions';
import { paths } from '@/helpers/paths';
import en from '@/helpers/lang';

interface AgentEditProfileFormProps {
  profileDetails: ACF;
  agentId: number;
  token: string;
}

const AgentEditProfileForm: React.FC<AgentEditProfileFormProps> = ({ profileDetails, agentId, token }) => {
  const [isPending, setIspending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const router = useRouter();
  // const initialVipExamples = profileDetails?.examples_of_vip_managed
  //   ? profileDetails.examples_of_vip_managed.map((example: string) => ({ value: example.trim() }))
  //   : [{ value: '' }];

  const defaultValues = {
    first_name: profileDetails?.first_name || '',
    last_name: profileDetails?.last_name || '',
    phone: profileDetails?.phone || '',
    company_name: profileDetails?.company_name || '',
    // vip_examples: initialVipExamples,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AgentEditProfileValues>({
    resolver: zodResolver(AgentEditProfileSchema),
    defaultValues,
  });

  // const { fields, append } = useFieldArray({
  //   control,
  //   name: 'vip_examples',
  // });

  // const addAnotherVip = () => {
  //   append({ value: '' });
  // };

  const onSubmit = async (formData: AgentEditProfileValues) => {
    setError('');
    setIspending(true);
    try {
      // const allVipExamples = formData.vip_examples
      //   .filter((example) => example.value.trim() !== '')
      //   .map((example) => ({
      //     text: example.value.trim(),
      //   }));

      const formDataObj: AgentEditFormDataObject = {
        acf: {
          first_name: formData.first_name || '',
          last_name: formData.last_name || '',
          phone: formData.phone || '',
          company_name: formData.company_name || '',
          // examples_of_vip_managed: allVipExamples,
        },
      };
      const response = await AgentProfileUpdate(agentId, formDataObj, token);
      await revalidatePathAction(paths.root.profile.getHref());
      if (response && response.error) {
        setError(`Error: ${response.error}`);
        setToasterOpen(true);
      }
      router.push(paths.root.profile.getHref());
    } catch (error) {
      setError(error?.toString() || en.signUpForm.unexpectedError); //
      setToasterOpen(true);
      setIspending(false);
    }
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
                    value={field.value}
                    placeholder={placeholder || ''}
                    type={'text'}
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                    autoComplete={autocomplete}
                  />
                )}
              />
            )}
            {name === 'company_name' && (
              <Box className="input-text company-name">
                <Typography>{en.signUpForm.optional}</Typography>
              </Box>
            )}
            {name === 'phone' && (
              <Box className="input-text">
                <Typography>{en.signUpForm.phoneCode}</Typography>
              </Box>
            )}
          </Box>
        ))}
        {/* {fields?.map((field, index) => (
          <Controller
            key={field.id}
            name={`vip_examples.${index}.value`}
            control={control}
            render={({ field }) => (
              <InputForm
                type={''}
                {...field}
                placeholder={en.signUpForm.vipExamples}
                error={!!errors.vip_examples?.[index]?.value}
                helperText={errors.vip_examples?.[index]?.value?.message}
              />
            )}
          />
        ))}
        <Box sx={{ cursor: 'pointer', mt: isEmpty(fields) ? 3 : 0 }} onClick={addAnotherVip}>
          <Box className="input-text">
            <Typography sx={{ textDecoration: 'underline' }}>{en.signUpForm.addVip}</Typography>
          </Box>
        </Box> */}
        <Button type="submit" disabled={isPending} className="button button--black" fullWidth>
          {isPending ? en.signUpForm.loading : en.signUpForm.continue}
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
