'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { FormValues, interestSchema } from './schema';
import SearchBar from '@/components/SearchBar/SearchBar';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ACF, ProfileBuilderStepsProps } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import { removeEmptyStrings } from '@/helpers/utils';

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
    },
  });

  const [searchTerm, setSearchTerm] = useState('');

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
      ); // Remove if already selected
    } else if (currentInterests.length < maxSelection) {
      setValue('interests', [...currentInterests, value]); // Add if not selected and under the max limit
    }
  };

  const onSubmit = async (data: FormValues) => {
    console.log('Selected known for step 1:', data.interests);
    const updatedProfileDetail: ACF = {
      ...profileDetail,
      known_for: data.interests,
    };

    console.log('updatedProfileDetail:', updatedProfileDetail);
    await UpdateProfile(id, token, removeEmptyStrings(updatedProfileDetail));
    onNext(updatedProfileDetail);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form step1-form">
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
          placeholder="Search for interests"
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
        <Typography color="error" textAlign="center">
          {errors.interests.message}
        </Typography>
      )}
      <CustomStepper currentStep={1} totalSteps={5} onPrev={onPrev} />
    </Box>
  );
};

export default Step1Form;
