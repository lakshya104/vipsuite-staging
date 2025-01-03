'use client';
import React, { useEffect, useState } from 'react';
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
  id,
  isAgent,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const {
    nationality_options = [],
    ethnicity_options = [],
    number_of_childs_options = ['0', '1', '2', '3', '4', '5'],
  } = profileBuilderOptions;

  const getVipStep3FormFields = (numberOfChildren: number): FormField[] => {
    const baseFields: FormField[] = [
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
    ];
    const childFields: FormField[] = [];
    for (let i = 0; i < numberOfChildren; i++) {
      childFields.push(
        {
          name: `ageOfChild[${i}]` as keyof Step3FormValues,
          label: `DOB of Child ${i + 1}`,
          type: 'date',
          placeholder: `Date of Birth for Child ${i + 1}`,
        },
        {
          name: `genderOfChild[${i}]` as keyof Step3FormValues,
          label: `Gender of Child ${i + 1}`,
          type: 'select',
          options: [
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Transgender', label: 'Transgender' },
          ],
        },
      );
    }
    const otherFields: FormField[] = [
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
    return [...baseFields, ...childFields, ...otherFields];
  };

  const defaultValues: Step3FormValues = {
    dateOfBirth: profileDetail.date_of_birth || '',
    birthplace: profileDetail.birth_place || '',
    nationality: profileDetail.nationality || '',
    ethnicity: profileDetail.ethnicity || '',
    numberOfChildren: profileDetail.number_of_children || '',
    ageOfChild: profileDetail.child_info ? profileDetail.child_info.map((child: ChildInfo) => child.dob) : [],
    genderOfChild: profileDetail.child_info ? profileDetail.child_info.map((child: ChildInfo) => child.gender) : [],
    pets: profileDetail.pets || '',
    homePostcode: profileDetail.home_post_code || '',
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    getValues,
    clearErrors,
    reset,
  } = useForm<Step3FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  interface ChildInfo {
    dob: string;
    gender: string;
  }

  const onSubmit = async (data: Step3FormValues) => {
    setIsLoading(true);
    let childInfo: ChildInfo[] | false =
      data.numberOfChildren === '0'
        ? []
        : data.ageOfChild
            ?.map((dob, index) => {
              const gender = data.genderOfChild?.[index] || '';
              if (!dob && !gender) {
                return false;
              }
              return {
                dob: dob || '',
                gender: gender,
              };
            })
            .filter((info) => info !== false) || [];
    if (childInfo.length === 0) {
      childInfo = false;
    }
    try {
      const updatedProfileDetail: ACF = {
        ...profileDetail,
        date_of_birth: data.dateOfBirth,
        birth_place: data.birthplace,
        nationality: data.nationality,
        ethnicity: data.ethnicity,
        number_of_children: data.numberOfChildren,
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
          nationality: data.nationality === '' ? null : data.nationality,
          ethnicity: data.ethnicity === '' ? null : data.ethnicity,
          number_of_children: data.numberOfChildren === '' ? null : data.numberOfChildren,
          pets: data.pets,
          home_post_code: data.homePostcode,
          child_info: childInfo,
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

  const numberOfChildren = watch('numberOfChildren');
  const homePostcodeValue = watch('homePostcode');
  const petsValue = watch('pets');
  const vipStep3formFields = getVipStep3FormFields(Number(numberOfChildren));

  useEffect(() => {
    if (numberOfChildren !== undefined) {
      const newAgeOfChild: string[] = [];
      const newGenderOfChild: string[] = [];
      reset({
        ...getValues(),
        ageOfChild: newAgeOfChild,
        genderOfChild: newGenderOfChild,
      });
      clearErrors(['ageOfChild', 'genderOfChild']);
    }
  }, [numberOfChildren, reset, getValues, clearErrors]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          Your Details
        </Typography>
      </Box>
      {vipStep3formFields.map((field) => {
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
                <SelectBox
                  {...commonProps}
                  options={field.options || []}
                  placeholder={field.placeholder}
                  getValues={getValues}
                  clearErrors={clearErrors}
                  numberOfChildren={numberOfChildren}
                />
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
      <CustomStepper currentStep={isAgent ? 4 : 3} totalSteps={isAgent ? 6 : 5} onPrev={onPrev} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default Step3Form;
