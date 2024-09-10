'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel, CircularProgress, Backdrop } from '@mui/material';
import { FormValues, interestSchema } from './schema';
import SearchBar from '@/components/SearchBar';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ACF, ProfileBuilderStepsProps } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import Toaster from '@/components/Toaster';
import UseToaster from '@/hooks/useToaster';

const Step1Form: React.FC<ProfileBuilderStepsProps> = ({
  profileBuilderOptions,
  profileDetail,
  onNext,
  onPrev,
  token,
  id,
}) => {
  const knownForOptions = profileBuilderOptions?.known_for_options || [];
  const knownFor = profileDetail.known_for || [];
  const content = profileDetail.type_of_content_create || [];
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      interests: knownFor,
      type_of_content_create: content,
    },
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredInterests = knownForOptions.filter((interest: string) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const watchInterests = watch('interests');

  const maxSelection = 3;
  const toggleInterest = (value: string) => {
    const currentInterests = watchInterests;
    if (currentInterests.includes(value)) {
      setValue(
        'interests',
        currentInterests.filter((i) => i !== value),
      );
    } else if (currentInterests.length < maxSelection) {
      setValue('interests', [...currentInterests, value]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const updatedProfileDetail: ACF = {
        ...profileDetail,
        known_for: data.interests,
        type_of_content_create: data.type_of_content_create,
      };
      const profile = {
        acf: {
          first_name: profileDetail.first_name,
          last_name: profileDetail.last_name,
          known_for: data.interests,
          // type_of_content_create: data.type_of_content_create,
        },
      };
      await UpdateProfile(id, token, profile);
      onNext(updatedProfileDetail);
    } catch (error) {
      openToaster('Error during profile update. ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  // const contentTypes = [
  //   { value: 'Lifestyle', label: 'Lifestyle' },
  //   { value: 'Beauty', label: 'Beauty' },
  //   { value: 'Fashion', label: 'Fashion' },
  //   { value: 'Travel', label: 'Travel' },
  //   { value: 'Mother And Baby', label: 'Mother And Baby' },
  //   { value: 'Family', label: 'Family' },
  //   { value: 'Comedy', label: 'Comedy' },
  //   { value: 'Music', label: 'Music' },
  //   { value: 'Art', label: 'Art' },
  //   { value: 'Sport', label: 'Sport' },
  //   { value: 'Health And Fitness', label: 'Health And Fitness' },
  //   { value: 'Food And Drink', label: 'Food And Drink' },
  // ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleCheckboxChange = (field: any, optionValue: string) => {
  //   const newValue = includes(field.value, optionValue)
  //     ? filter(field.value, (value: string) => value !== optionValue)
  //     : union(field.value, [optionValue]);

  //   field.onChange(newValue);
  // };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ position: 'relative' }}
      className="profile-builder__form step1-form"
    >
      <Box className="profile-builder__search">
        <Typography variant="h2" textAlign="center">
          What are you known for?
        </Typography>
        <Typography variant="h3" textAlign="center">
          Select a maximum of 3 to continue
        </Typography>
        <SearchBar
          searchTerm={searchTerm}
          handleChange={handleChange}
          handleClear={handleClear}
          placeholder="Search for an attribute"
        />
      </Box>

      <FormGroup className="profile-builder__form-group">
        <Box className="profile-builder__form-row">
          {filteredInterests.length > 0 ? (
            filteredInterests.map((interest: string) => (
              <FormControlLabel
                key={interest}
                control={
                  <Checkbox
                    checked={watchInterests.includes(interest)}
                    onClick={() => toggleInterest(interest)}
                    {...register('interests')}
                    value={interest}
                    disabled={watchInterests.length >= maxSelection && !watchInterests.includes(interest)}
                  />
                }
                label={interest}
              />
            ))
          ) : (
            <Typography textAlign="center">No results found</Typography>
          )}
        </Box>
      </FormGroup>
      {errors.interests && (
        <Typography
          color="error"
          textAlign="center"
          sx={{ position: 'absolute', zIndex: 999, bottom: '10%', left: { xs: '24%', md: '32%' } }}
        >
          {errors.interests.message}
        </Typography>
      )}
      {/* {watchInterests?.includes('Content Creator') && (
        <>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Type of Content
          </Typography>
          <FormGroup className="profile-builder__form-group">
            <Box className="profile-builder__form-row">
              {contentTypes.map((option) => (
                <Box key={option.value}>
                  <Controller
                    name="type_of_content_create"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
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
            {errors.type_of_content_create && (
              <Typography color="error" textAlign="center">
                Please select an option
              </Typography>
            )}
          </FormGroup>
        </>
      )} */}
      <CustomStepper currentStep={1} totalSteps={5} onPrev={onPrev} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default Step1Form;
