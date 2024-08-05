'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useRouter } from 'next/navigation';
import { interests } from '@/data';
import { FormValues, interestSchema } from './schema';
import SearchBar from '@/components/SearchBar/SearchBar';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';

const Step1Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      interests: [],
    },
  });

  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredInterests = interests.filter((interest) =>
    interest.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const watchInterests = watch('interests');

  const maxSelection = 3;
  const toggleInterest = (value: string) => {
    const currentInterests = watchInterests;
    if (currentInterests.length < maxSelection || currentInterests.includes(value)) {
      const newInterests = currentInterests.includes(value)
        ? currentInterests.filter((i) => i !== value)
        : [...currentInterests, value];
      setValue('interests', newInterests);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('Selected interests:', data.interests);
    router.push('/vip-profile-builder/step2');
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
            filteredInterests.map((interest) => (
              <FormControlLabel
                key={interest.value}
                checked={watchInterests.includes(interest.value)}
                control={
                  <Checkbox
                    checked={watchInterests.includes(interest.value)}
                    onClick={() => toggleInterest(interest.value)}
                    {...register('interests')}
                    value={interest.value}
                    disabled={watchInterests.length >= maxSelection && !watchInterests.includes(interest.value)}
                  />
                }
                label={interest.label}
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
      <CustomStepper currentStep={1} totalSteps={5} />
    </Box>
  );
};

export default Step1Form;
