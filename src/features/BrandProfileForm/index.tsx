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
import { QuestionType } from '@/helpers/enums';
import en from '@/helpers/lang';

interface BrandEditProfileFormProps {
  profileDetails: ACF;
  brandId: number;
  brandSignupOptions: string[];
}

const BrandEditProfileForm: React.FC<BrandEditProfileFormProps> = ({ profileDetails, brandId, brandSignupOptions }) => {
  const [isPending, setIspending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const router = useRouter();
  const brandOptions = brandSignupOptions.map((option) => ({
    value: option,
    label: option,
  }));

  const defaultValues = {
    first_name: profileDetails?.first_name || '',
    last_name: profileDetails?.last_name || '',
    phone: profileDetails?.phone || '',
    brand_name: profileDetails?.brand_name || '',
    type_of_business: profileDetails?.type_of_business || '',
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
          type_of_business: [formData.type_of_business || ''],
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
      setError(error?.toString() || en.signUpForm.errMessage);
      setToasterOpen(true);
      setIspending(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {BrandEditProfileFields?.map(({ name, placeholder, autocomplete, type, label }) => (
          <Box key={name}>
            {type === QuestionType.Dropdown ? (
              <SelectBox
                name={name}
                control={control}
                placeholder={placeholder}
                options={brandOptions}
                label={label || 'select'}
                errors={errors}
              />
            ) : (
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <InputForm
                    label={placeholder}
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
            {name === 'phone' && (
              <Box className="input-text">
                <Typography>{en.signUpForm.phoneCode}</Typography>
              </Box>
            )}
          </Box>
        ))}
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

export default BrandEditProfileForm;
