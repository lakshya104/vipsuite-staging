'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Backdrop,
  CircularProgress,
  Dialog,
} from '@mui/material';
import { FormValues, interestSchema } from './schema';
import SearchBar from '@/components/SearchBar';
import CustomStepper from '@/components/CustomStepper';
import '../ProfileBuilder.scss';
import { ProfileBuilderStepsProps } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import revalidatePathAction from '@/libs/actions';
import { useEditVipIdStore } from '@/store/useStore';
import { paths } from '@/helpers/paths';
import VipAddedDialog from '@/components/VipAddedDialog';

const Step5Form: React.FC<ProfileBuilderStepsProps> = ({
  profileBuilderOptions,
  profileDetail,
  onPrev,
  id,
  isAgent,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vipAddedDialogOpen, setVipAddedDialogOpen] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get('profile-route');
  const isEditVip = searchParams.get('edit');
  const { clearVipId } = useEditVipIdStore();
  const interestOptions = profileBuilderOptions?.interests_options;
  const interests = profileDetail?.interests;
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
      await revalidatePathAction(paths.root.profile.getHref());
      clearVipId();
      if (isAgent && !isProfileEdit) {
        setVipAddedDialogOpen(true);
      } else if (isProfileEdit || isEditVip) {
        router.push(paths.root.profile.getHref());
      } else {
        router.push(paths.root.home.getHref());
      }
    } catch (error) {
      openToaster('Error during profile update. ' + error);
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
            sx={{ position: 'absolute', zIndex: 999, bottom: '20%', left: { xs: '24%', md: '32%' } }}
          >
            {errors.interests.message}
          </Typography>
        )}
        <CustomStepper currentStep={isAgent ? 6 : 5} totalSteps={isAgent ? 6 : 5} onPrev={onPrev} />
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
      <Dialog open={vipAddedDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <VipAddedDialog />
      </Dialog>
    </>
  );
};

export default Step5Form;
