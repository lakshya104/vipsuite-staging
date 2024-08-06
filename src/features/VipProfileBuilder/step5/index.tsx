'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { interestsStep5 } from '@/data';
import DialogBox from '@/components/Dialog/Dialog';
import { FormValues, interestSchema } from './schema';
import SearchBar from '@/components/SearchBar/SearchBar';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';

const dialogBoxContent = {
  title: 'Thank You!',
  subTitle: 'Profile in Review',
  description:
    'Thanks for completing your profile. Your profile will be moderated and we will contact you once your profile has been verified. You can update your profile at any time.',
  buttonText: 'Done',
  isCrossIcon: true,
};

const Step5Form = () => {
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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDialogBoxDataChange = (data: boolean) => {
    setIsDialogOpen(data);
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredInterests = interestsStep5.filter((interest) =>
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
    setIsDialogOpen(true);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form step5-form">
        <Box className="profile-builder__search">
          <Typography variant="h2" textAlign="center">
            Your Interests
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
        {errors.interests && <Typography color="error">{errors.interests.message}</Typography>}
        <CustomStepper currentStep={5} totalSteps={5} />
      </Box>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
    </>
  );
};

export default Step5Form;
