'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBox from '@/components/SelectBox';
import FormDatePicker from '@/components/FormDatePicker';
import InputTextFormField from '@/components/InputTextFormField';
import { formSchema, Step3FormValues } from './schema';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ACF, ProfileBuilderStepsProps } from '@/interfaces';
import { removeEmptyStrings } from '@/helpers/utils';
import { UpdateProfile } from '@/libs/api-manager/manager';
import Toaster from '@/components/Toaster';
import UseToaster from '@/hooks/useToaster';

interface FormField {
  name: keyof Step3FormValues;
  label: string;
  type: 'select' | 'date' | 'text';
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const Step3Form: React.FC<ProfileBuilderStepsProps> = ({
  profileBuilderOptions,
  profileDetail,
  onNext,
  onPrev,
  token,
  id,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const {
    nationality_options = [],
    ethnicity_options = [],
    number_of_childs_options = ['0', '1', '2', '3', '4', '5+'],
  } = profileBuilderOptions;

  const vipStep3formFields: FormField[] = [
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      placeholder: 'Date of Birth',
    },
    {
      name: 'birthplace',
      label: 'Birthplace',
      type: 'text',
      placeholder: 'Birthplace',
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      options: nationality_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'ethnicity',
      label: 'Ethnicity',
      type: 'select',
      options: ethnicity_options.map((opt: string) => ({ value: opt, label: opt })),
    },
    {
      name: 'numberOfChildren',
      label: 'Number of Children',
      type: 'select',
      options: number_of_childs_options.map((opt: string) => ({ value: opt, label: `${opt} Child` })),
    },
    {
      name: 'ageOfChild',
      label: 'Age of Child',
      type: 'date',
    },
    {
      name: 'pets',
      label: 'Pets',
      type: 'text',
      placeholder: 'Pets',
    },
    {
      name: 'homePostcode',
      label: 'Home Postcode',
      type: 'text',
      placeholder: 'Home Postcode',
    },
  ];
console.log({profileDetail});

  const defaultValues: Step3FormValues = {
    dateOfBirth: profileDetail.date_of_birth || '',
    birthplace: profileDetail.birth_place || '',
    nationality: profileDetail.nationality || '',
    ethnicity: profileDetail.ethnicity || '',
    numberOfChildren: profileDetail.number_of_childs || '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ageOfChild: profileDetail.child_info ? profileDetail.child_info.map((child: any) => child.dob) : [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    genderOfChild: profileDetail.child_info ? profileDetail.child_info.map((child: any) => child.gender) : [],
    pets: profileDetail.pets || '',
    homePostcode: profileDetail.home_post_code || '',
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<Step3FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: Step3FormValues) => {
    setIsLoading(true);
    const childInfo =
      data.numberOfChildren === '0'
        ? data.ageOfChild?.map(() => ({
            dob: '',
            gender: '',
          })) || []
        : data.ageOfChild?.map((dob, index) => ({
            dob: dob,
            gender: data.genderOfChild?.[index],
          })) || [];
    try {
      const updatedProfileDetail: ACF = {
        ...profileDetail,
        date_of_birth: data.dateOfBirth,
        birth_place: data.birthplace,
        nationality: data.nationality,
        ethnicity: data.ethnicity,
        number_of_childs: data.numberOfChildren,
        pets: data.pets,
        home_post_code: data.homePostcode,
        child_info: childInfo,
      };
      const profile = {
        acf: {
          first_name: profileDetail.first_name,
          last_name: profileDetail.last_name,
          date_of_birth: data.dateOfBirth,
          birth_place: data.birthplace,
          nationality: data.nationality,
          ethnicity: data.ethnicity,
          number_of_childs: data.numberOfChildren,
          pets: data.pets,
          home_post_code: data.homePostcode,
          child_info: childInfo,
        },
      };
      await UpdateProfile(id, token, removeEmptyStrings(profile));
      onNext(updatedProfileDetail);
    } catch (error) {
      openToaster('Error during profile update. ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const numberOfChildren = watch('numberOfChildren');
  const homePostcodeValue = watch('homePostcode');
  const petsValue = watch('pets');
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          Your Details
        </Typography>
      </Box>
      {vipStep3formFields.map((field) => {
        if (field.name === 'ageOfChild') {
          const numChildren = parseInt(numberOfChildren || '0', 10);
          if (numChildren > 0) {
            return Array.from({ length: numChildren }).map((_, index) => (
              <React.Fragment key={`${field.name}-${index}`}>
                <Box width="100%">
                  <FormDatePicker
                    name={`ageOfChild.${index}` as const}
                    control={control}
                    label={`Child ${index + 1} Date of Birth`}
                  />
                </Box>
                <Box width="100%">
                  <SelectBox
                    name={`genderOfChild.${index}` as const}
                    control={control}
                    label={`Child ${index + 1} Gender`}
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                    ]}
                    errors={errors}
                  />
                </Box>
              </React.Fragment>
            ));
          }
          return null;
        }
        const commonProps = {
          name: field.name,
          control,
          label: field.label,
          errors,
        };
        switch (field.type) {
          case 'select':
            return (
              <Box key={field.name} width="100%">
                <SelectBox {...commonProps} options={field.options || []} placeholder={field.placeholder} />
              </Box>
            );
          case 'date':
            return (
              <Box key={field.name} width="100%">
                <FormDatePicker {...commonProps} />
              </Box>
            );
          case 'text':
          default:
            return (
              <Box key={field.name} width="100%">
                <InputTextFormField {...commonProps} placeholder={field.placeholder} />
                {field.name === 'pets' && !errors[field.name] && !petsValue && (
                  <Box className="input-text">
                    <Typography>Separate with commas</Typography>
                  </Box>
                )}
                {field.name === 'homePostcode' && !errors[field.name] && !homePostcodeValue && (
                  <Box className="input-text">
                    <Typography>You can enter the first part only e.g. EC1</Typography>
                  </Box>
                )}
              </Box>
            );
        }
      })}
      <CustomStepper currentStep={3} totalSteps={5} onPrev={onPrev} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default Step3Form;
