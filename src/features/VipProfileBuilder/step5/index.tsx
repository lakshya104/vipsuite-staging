'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel, Backdrop, CircularProgress } from '@mui/material';
import DialogBox from '@/components/Dialog/Dialog';
import { FormValues, interestSchema } from './schema';
import SearchBar from '@/components/SearchBar';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ProfileBuilderStepsProps } from '@/interfaces';
import { removeEmptyStrings } from '@/helpers/utils';
import { UpdateProfile } from '@/libs/api-manager/manager';
import { signOut } from 'next-auth/react';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { useRouter } from 'next/navigation';

const dialogBoxContent = {
  title: 'Thank You!',
  subTitle: 'Profile in Review',
  description:
    'Thanks for completing your profile. Your profile will be moderated and we will contact you once your profile has been verified. You can update your profile at any time.',
  buttonText: 'Done',
  isCrossIcon: true,
};

const Step5Form: React.FC<ProfileBuilderStepsProps> = ({ profileBuilderOptions, profileDetail, onPrev, token, id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const interestOptions = profileBuilderOptions.interests_options;
  const interests = profileDetail.interests;
  const isApproved = profileDetail.profile_status === 'approved' ? true : false;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      interests: interests,
    },
  });
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const handleDialogBoxDataChange = (data: boolean) => {
    setIsDialogOpen(data);
    signOut();
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredInterests = interestOptions.filter((interest: string) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const profile = {
        acf: {
          first_name: profileDetail.first_name,
          last_name: profileDetail.last_name,
          interests: data.interests,
        },
      };
      await UpdateProfile(id, token, removeEmptyStrings(profile));
      if (isApproved) {
        router.push('/profile');
      } else {
        setIsDialogOpen(true);
      }
    } catch (error) {
      openToaster('Error during profile update. ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ position: 'relative' }}
        className="profile-builder__form step5-form"
      >
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
            placeholder="Search for an attribute"
          />
        </Box>
        <FormGroup className="profile-builder__form-group">
          <Box className="profile-builder__form-row">
            {filteredInterests.length > 0 ? (
              filteredInterests.map((interest: string) => (
                <FormControlLabel
                  key={interest}
                  checked={watchInterests.includes(interest)}
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
            sx={{ position: 'absolute', zIndex: 999, bottom: '10%', left: '24%' }}
          >
            {errors.interests.message}
          </Typography>
        )}
        <CustomStepper currentStep={5} totalSteps={5} onPrev={onPrev} />
      </Box>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default Step5Form;
