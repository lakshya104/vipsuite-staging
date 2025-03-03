'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '../../components/InputForm/InputForm';
import { BrandEditProfileFields } from '@/data';
import './BrandEditForm.scss';
import { BrandEditProfileSchema, BrandEditProfileValues } from './types';
import SelectBox from '@/components/SelectBox';
import Toaster from '@/components/Toaster';
import { BrandProfileUpdate } from '@/libs/api-manager/manager';
import { ACF, BrandEditFormDataObject } from '@/interfaces';
import revalidatePathAction from '@/libs/actions';
import { paths } from '@/helpers/paths';

interface BrandEditProfileFormProps {
  profileDetails: ACF;
  brandId: number;
}

const BrandEditProfileForm: React.FC<BrandEditProfileFormProps> = ({ profileDetails, brandId }) => {
  const [isPending, setIspending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const router = useRouter();
  const initialVipExamples = profileDetails?.examples_of_vip_managed
    ? profileDetails.examples_of_vip_managed.map((example: string) => ({ value: example.trim() }))
    : [{ value: '' }];

  const defaultValues = {
    first_name: profileDetails?.first_name || '',
    last_name: profileDetails?.last_name || '',
    phone: profileDetails?.phone || '',
    brand_name: profileDetails?.brand_name || '',
    vip_examples: initialVipExamples,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandEditProfileValues>({
    resolver: zodResolver(BrandEditProfileSchema),
    defaultValues,
  });

  const onSubmit = async (formData: BrandEditProfileValues) => {
    setError('');
    setIspending(true);
    try {
      const formDataObj: BrandEditFormDataObject = {
        acf: {
          first_name: formData.first_name || '',
          last_name: formData.last_name || '',
          phone: formData.phone || '',
          brand_name: formData.brand_name || '',
          type_of_business: formData.type_of_business || [],
        },
      };
      const response = await BrandProfileUpdate(brandId, formDataObj);
      await revalidatePathAction(paths.root.profile.getHref());
      if (response && response.error) {
        setError(`Error: ${response.error}`);
        setToasterOpen(true);
      }
      router.push(paths.root.profile.getHref());
    } catch (error) {
      setError(error?.toString() || 'An unexpected error occurred'); //
      setToasterOpen(true);
      setIspending(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {BrandEditProfileFields?.map(({ name, placeholder, autocomplete, type, label, options }) => (
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
            {/* {name === 'company_name' && (
              <Box className="input-text company-name">
                <Typography>Optional</Typography>
              </Box>
            )} */}
            {name === 'phone' && (
              <Box className="input-text">
                <Typography>Including the country code with + sign</Typography>
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
                placeholder={`Example of VIP Managed`}
                error={!!errors.vip_examples?.[index]?.value}
                helperText={errors.vip_examples?.[index]?.value?.message}
              />
            )}
          />
        ))}
        <Box sx={{ cursor: 'pointer', mt: isEmpty(fields) ? 3 : 0 }} onClick={addAnotherVip}>
          <Box className="input-text">
            <Typography sx={{ textDecoration: 'underline' }}>Add Another Vip</Typography>
          </Box>
        </Box> */}
        <Button type="submit" disabled={isPending} className="button button--black" fullWidth>
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

export default BrandEditProfileForm;
