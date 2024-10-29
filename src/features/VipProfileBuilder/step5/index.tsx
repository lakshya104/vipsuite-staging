'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Typography, Checkbox, FormGroup, FormControlLabel, Backdrop, CircularProgress } from '@mui/material';
import { signOut } from 'next-auth/react';
import DialogBox from '@/components/Dialog';
import { FormValues, interestSchema } from './schema';
import SearchBar from '@/components/SearchBar';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ProfileBuilderStepsProps } from '@/interfaces';
import { LogOut, UpdateProfile } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import revalidatePathAction from '@/libs/actions';
import { useEditVipIdStore } from '@/store/useStore';
import { ProfileStatus } from '@/helpers/enums';

const dialogBoxContent = {
  title: 'Thank You!',
  subTitle: 'Profile in Review',
  description:
    'Thanks for completing your profile. Your profile will be moderated and we will contact you once your profile has been verified.',
  description2: 'You can update your profile at any time.',
  buttonText: 'Done',
  isCrossIcon: true,
};

const vipAddedDialogBoxContent = {
  title: 'Thank You!',
  subTitle: 'VIP Added',
  description: 'Thanks for adding a VIP. You can update your VIP’s profile at any time.',
  description2: 'Would you like to add another VIP?',
  buttonText: 'Add Another Vip',
  buttonText2: 'Continue',
  isCrossIcon: true,
};

const Step5Form: React.FC<ProfileBuilderStepsProps> = ({
  profileBuilderOptions,
  profileDetail,
  onPrev,
  id,
  isAgent,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get('profile-route');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [isVipAddedDialogOpen, setIsVipAddedDialogOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const { clearVipId } = useEditVipIdStore();
  const interestOptions = profileBuilderOptions?.interests_options;
  const interests = profileDetail?.interests;
  const isApproved = profileDetail?.profile_status === ProfileStatus.Approved ? true : false;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      interests: interests || [],
    },
  });

  const handleDialogBoxDataChange = async (data: boolean) => {
    try {
      setIsDialogOpen(data);
      setIsLoading(true);
      await LogOut();
      signOut();
    } catch (error) {
      setIsLoading(false);
      openToaster('Error: ' + error);
    }
  };

  const handleVipAddedDataChange = async (data: boolean) => {
    try {
      setIsVipAddedDialogOpen(data);
      setIsLoading(true);
      window.location.href = '/agent-profile-builder';
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      openToaster('Error: ' + error);
    }
  };
  const handleVipAddedDataChange2 = async (data: boolean) => {
    try {
      setIsVipAddedDialogOpen(data);
      setIsLoading(true);
      router.push(isProfileEdit ? '/profile' : '/my-vips');
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      openToaster('Error: ' + error);
    }
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredInterests = interestOptions.filter((interest: string) =>
    interest?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  const watchInterests = watch('interests') || [];

  const maxSelection = 3;
  const toggleInterest = (value: string) => {
    const currentInterests = watchInterests;
    if (currentInterests?.length < maxSelection || currentInterests?.includes(value)) {
      const newInterests = currentInterests?.includes(value)
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
      await UpdateProfile(id, profile);
      await revalidatePathAction('/profile');
      clearVipId();
      if (isApproved) {
        router.push('/profile');
      } else if (isAgent) {
        setIsVipAddedDialogOpen(true);
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
            {filteredInterests?.length > 0 ? (
              filteredInterests.map((interest: string) => (
                <FormControlLabel
                  key={interest}
                  checked={Array.isArray(watchInterests) && watchInterests.includes(interest)}
                  control={
                    <Checkbox
                      checked={Array.isArray(watchInterests) && watchInterests.includes(interest)}
                      onClick={() => toggleInterest(interest)}
                      {...register('interests')}
                      value={interest}
                      disabled={
                        Array.isArray(watchInterests) &&
                        watchInterests.length >= maxSelection &&
                        !watchInterests.includes(interest)
                      }
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
        <CustomStepper currentStep={isAgent ? 6 : 5} totalSteps={isAgent ? 6 : 5} onPrev={onPrev} />
      </Box>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
      <DialogBox
        isDialogOpen={isVipAddedDialogOpen}
        onDataChange={handleVipAddedDataChange}
        onDataChange2={handleVipAddedDataChange2}
        content={vipAddedDialogBoxContent}
      />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default Step5Form;
