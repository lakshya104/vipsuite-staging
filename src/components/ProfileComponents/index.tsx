'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { get } from 'lodash';
import { expiryDate, formatDateWithMonth } from '@/helpers/utils';
import { UserProfile } from '@/interfaces';
import { Backdrop, Box, Button, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddIcon from '@mui/icons-material/Add';
import ErrorFallback from '../ErrorFallback';
import en from '@/helpers/lang';
import { DeleteAccount, UpdateSocials } from '@/libs/api-manager/manager';
import { signOutAction } from '@/libs/actions';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';
import DialogConfirmBox from '../Dialog/DialogConfirm';
import { useInstaInfo, useTiktokInfo } from '@/store/useStore';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues, EditSocialLinksRequestBody, EditSocialLinksSchema } from './types';
import InputTextFormField from '../InputTextFormField';

interface ProfileComponentProps {
  profileDetails: UserProfile;
  isAgent?: boolean;
  isBrand?: boolean;
}

export const BioComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const dateOfBirth = get(profileDetails, 'acf.date_of_birth', '');
  const bioData = [
    { label: en.profilePage.profileTabs.bio.dob, value: dateOfBirth && formatDateWithMonth(dateOfBirth) },
    { label: en.profilePage.profileTabs.bio.born, value: get(profileDetails, 'acf.birth_place', '') },
    { label: en.profilePage.profileTabs.bio.resides, value: get(profileDetails, 'acf.nationality', '') },
    {
      label: en.profilePage.profileTabs.bio.interests,
      value:
        get(profileDetails, 'acf.interests', []).length > 0 ? get(profileDetails, 'acf.interests', []).join(', ') : '',
    },
  ];
  const filteredBioData = bioData.filter((data) => data.value !== '');
  if (filteredBioData.length === 0) {
    return (
      <ErrorFallback
        halfHeight={true}
        errorMessage={en.listEmptyMessage.noBioData}
        hideSubtext={true}
        subtext={en.listEmptyMessage.noContactDataMessage}
      />
    );
  }

  return (
    <Grid2 container>
      {filteredBioData.map((item, index) => (
        <Grid2 size={{ xs: 12 }} key={index} className="user-profile__details-item">
          <Paper elevation={0}>
            <Grid2 container>
              <Grid2 size={{ xs: 4 }}>
                <Typography variant="body1" fontWeight="500">
                  {item.label}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 8 }}>
                <Typography variant="body2">{item.value}</Typography>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
};

export const SocialComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const [openForm, setOpenForm] = useState({
    openForm: false,
    openInsta: false,
    openTiktok: false,
  });
  const [socialLinks, setSocialLinks] = useState({
    instagram_handle: get(profileDetails, 'acf.instagram_handle', ''),
    tiktok_handle: get(profileDetails, 'acf.tiktok_handle', ''),
  });
  const [loading, setLoading] = useState(false);
  const { instaInfo, clearAll: clearInstaData } = useInstaInfo();
  const { tiktokInfo, clearAll: clearTiktokData } = useTiktokInfo();
  const clearInstaInfo = useInstaInfo((state) => state.clearAll);
  const clearTiktokInfo = useTiktokInfo((state) => state.clearAll);
  const instaHydrated = useInstaInfo((state) => state.hydrated);
  const tiktokHydrated = useTiktokInfo((state) => state.hydrated);
  const hydrated = instaHydrated && tiktokHydrated;
  const setInstaHydrated = useInstaInfo((state) => state.setHydrated);
  const setTiktokHydrated = useTiktokInfo((state) => state.setHydrated);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditSocialLinksRequestBody>({
    resolver: zodResolver(EditSocialLinksSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    setTimeout(() => {
      setInstaHydrated(true);
      setTiktokHydrated(true);
    }, 500);
  }, [setInstaHydrated, setTiktokHydrated]);

  useEffect(() => {
    if (hydrated) {
      clearInstaInfo();
      clearTiktokInfo();
    }
  }, [hydrated, clearInstaInfo, clearTiktokInfo]);

  useEffect(() => {
    if (instaInfo.username) {
      updateInstagramHandle(instaInfo.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instaInfo.username]);

  const updateInstagramHandle = (username: string) => {
    reset((prevValues) => ({
      ...prevValues,
      instagram_handle: username,
    }));
  };

  useEffect(() => {
    if (tiktokInfo.username) {
      updateTiktokHandle(tiktokInfo.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiktokInfo.username]);

  const updateTiktokHandle = (username: string) => {
    reset((prevValues) => ({
      ...prevValues,
      tiktok_handle: username,
    }));
  };

  const openInstagramAuth = () => {
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(
      process.env.NEXT_PUBLIC_INSTAGRAM_CALLBACK_URL,
      'InstagramAuth',
      `width=${width},height=${height},left=${left},top=${top}`,
    );
  };

  const openTikTokAuth = () => {
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(
      `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID}&response_type=code&scope=user.info.basic,user.info.stats&redirect_uri=${process.env.NEXT_PUBLIC_TIKTOK_CALLBACK_URL}`,
      'TikTokAuth',
      `width=${width},height=${height},left=${left},top=${top}`,
    );
  };

  const socialData: {
    platform: string;
    handle: string;
    name: 'instagram_handle' | 'tiktok_handle';
  }[] = [
    {
      platform: en.profilePage.profileTabs.social.instagram,
      handle: socialLinks.instagram_handle,
      name: 'instagram_handle',
    },
    {
      platform: en.profilePage.profileTabs.social.tikTok,
      handle: socialLinks.tiktok_handle,
      name: 'tiktok_handle',
    },
  ];
  const getInstagramButtonText = () => {
    if (!hydrated) {
      return en.signUpForm.loading;
    }
    if (instaInfo.code) {
      return en.signUpForm.authorisedInstagram;
    }
    return en.signUpForm.authoriseInstagram;
  };

  const getTikTokText = () => {
    if (!hydrated) {
      return en.signUpForm.loading;
    }
    if (tiktokInfo.code) {
      return en.signUpForm.authorisedTiktok;
    }
    return en.signUpForm.authoriseTiktok;
  };

  const onSubmit = async (data: EditSocialLinksRequestBody) => {
    try {
      setLoading(true);
      const updatedFormData = {
        ...data,
        instagram_follower_count: instaInfo.followers,
        instagram_access_token: instaInfo.code,
        instagram_profile_image_url: instaInfo.picture,
        instagram_token_expiry: expiryDate(instaInfo.expires),
        tiktok_follower_count: tiktokInfo.followers,
        tiktok_access_token: tiktokInfo.code,
        tiktok_refresh_token: tiktokInfo.refreshCode,
        tiktok_token_expiry: expiryDate(tiktokInfo.expires),
      };
      if (data.instagram_handle || data.tiktok_handle) {
        await UpdateSocials(updatedFormData);
      }
      setSocialLinks({
        instagram_handle: data.instagram_handle || get(profileDetails, 'acf.instagram_handle', '') || 'N/A',
        tiktok_handle: data.tiktok_handle || get(profileDetails, 'acf.tiktok_handle', '') || 'N/A',
      });
    } catch (error) {
      console.log('Error submitting form:', error);
    } finally {
      setLoading(false);
      setOpenForm({
        openForm: false,
        openInsta: false,
        openTiktok: false,
      });
      clearInstaData();
      clearTiktokData();
    }
  };

  return (
    <Grid2 container>
      {openForm.openForm ? (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          {(openForm.openInsta || openForm.openTiktok) && (
            <>
              <Grid2 size={{ xs: 12 }} sx={{ width: '100%' }} className="user-profile__details-item">
                <Paper elevation={0}>
                  <Grid2 container>
                    <Grid2 size={{ xs: 4 }}>
                      <Typography variant="body1" fontWeight="500">
                        Instagram
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 8, md: 4 }}>
                      {openForm.openInsta ? (
                        <>
                          <Controller
                            name="instagram_handle"
                            control={control}
                            render={({ field }) => (
                              <InputTextFormField
                                {...field}
                                control={control}
                                name="instagram_handle"
                                placeholder="Instagram"
                                autoFill={true}
                                errors={errors}
                              />
                            )}
                          />
                          <Box sx={{ mt: -3 }}>
                            <Button
                              sx={{ textDecoration: 'underline', textTransform: 'capitalize' }}
                              disabled={!hydrated || !!instaInfo.code}
                              onClick={openInstagramAuth}
                            >
                              {getInstagramButtonText()}
                            </Button>
                            <Button
                              disabled={loading}
                              sx={{ textDecoration: loading ? 'underline' : '', textTransform: 'capitalize' }}
                              type="submit"
                            >
                              {en.signUpForm.continue}
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Typography variant="body2">{socialLinks.instagram_handle || 'N/A'}</Typography>
                      )}
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid2>
              <Grid2 size={{ xs: 12 }} sx={{ width: '100%' }} className="user-profile__details-item">
                <Paper elevation={0}>
                  <Grid2 container>
                    <Grid2 size={{ xs: 4 }}>
                      <Typography variant="body1" fontWeight="500">
                        Tik-Tok
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 8, md: 4 }}>
                      {openForm.openTiktok ? (
                        <>
                          <Controller
                            name="tiktok_handle"
                            control={control}
                            render={({ field }) => (
                              <InputTextFormField
                                {...field}
                                control={control}
                                name="tiktok_handle"
                                placeholder="Tik-Tok"
                                autoFill={true}
                                errors={errors}
                              />
                            )}
                          />
                          <Box sx={{ mt: -3 }}>
                            <Button
                              sx={{ textDecoration: 'underline', textTransform: 'capitalize' }}
                              disabled={!hydrated || !!instaInfo.code}
                              onClick={openTikTokAuth}
                            >
                              {getTikTokText()}
                            </Button>
                            <Button
                              disabled={loading}
                              sx={{ textDecoration: loading ? 'underline' : '', textTransform: 'capitalize' }}
                              type="submit"
                            >
                              {en.signUpForm.continue}
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Typography variant="body2">{socialLinks.tiktok_handle || 'N/A'}</Typography>
                      )}
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid2>
            </>
          )}
        </Box>
      ) : (
        socialData.map((item, index) => (
          <Grid2 size={{ xs: 12 }} key={index} className="user-profile__details-item">
            <Paper elevation={0}>
              <Grid2 container>
                <Grid2 size={{ xs: 4 }}>
                  <Typography variant="body1" fontWeight="500">
                    {item.platform}
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 8 }}>
                  {item.handle ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">{item.handle}</Typography>
                      <Button
                        onClick={() =>
                          setOpenForm({
                            openForm: true,
                            openInsta: item.name === 'instagram_handle',
                            openTiktok: item.name === 'tiktok_handle',
                          })
                        }
                      >
                        <EditNoteIcon />
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                      <Button
                        onClick={() =>
                          setOpenForm({
                            openForm: true,
                            openInsta: item.name === 'instagram_handle',
                            openTiktok: item.name === 'tiktok_handle',
                          })
                        }
                        sx={{ border: '1px solid', borderColor: 'grey.500', borderRadius: 2, padding: 0.5 }}
                      >
                        <Typography variant="body2">Add</Typography>
                        <AddIcon />
                      </Button>
                    </Box>
                  )}
                </Grid2>
              </Grid2>
            </Paper>
          </Grid2>
        ))
      )}
    </Grid2>
  );
};

export const ContactsComponent: React.FC<ProfileComponentProps> = ({ profileDetails, isAgent, isBrand }) => {
  const [isPending, startTransition] = useTransition();
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('error');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const contactData = [
    ...(isBrand
      ? [
          {
            type: en.profilePage.profileTabs.contacts.contactPerson,
            primary: get(profileDetails, 'acf.first_name', '') + ' ' + get(profileDetails, 'acf.last_name', ''),
          },
        ]
      : []),
    {
      type: en.profilePage.profileTabs.contacts.email,
      primary: get(profileDetails, 'email', ''),
      secondary: get(profileDetails, 'acf.secondary_email', ''),
    },
    {
      type: isAgent ? en.profilePage.profileTabs.contacts.agentPhone : en.profilePage.profileTabs.contacts.phone,
      primary: get(profileDetails, 'acf.phone', ''),
    },
    ...(isAgent
      ? [
          {
            type: en.profilePage.profileTabs.contacts.company,
            primary: get(profileDetails, 'acf.company_name', ''),
          },
        ]
      : []),
    ...(isBrand
      ? [
          {
            type: en.profilePage.profileTabs.contacts.busineeType,
            primary: get(profileDetails, 'acf.type_of_business', ''),
          },
        ]
      : []),
  ];

  const filteredContactData = contactData.filter((contact) => contact.primary || contact.secondary);
  if (filteredContactData.length === 0) {
    return (
      <ErrorFallback
        halfHeight={true}
        errorMessage={en.listEmptyMessage.noContactData}
        hideSubtext={true}
        subtext={en.listEmptyMessage.noContactDataMessage}
      />
    );
  }

  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleDeleteAccount = async () => {
    try {
      startTransition(async () => {
        const response = await DeleteAccount();
        setToasterType('success');
        openToaster(response.message || en.profilePage.profileTabs.contacts.successAccountDelete);
        setTimeout(async () => {
          await signOutAction();
        }, 2000);
      });
    } catch (error) {
      setToasterType('error');
      openToaster(en.profilePage.profileTabs.contacts.deletAccountError + error);
    }
  };

  return (
    <Grid2 className="user-profile__wrapper" container>
      {filteredContactData.map((item, index) => (
        <Grid2 size={{ xs: 12 }} key={index} className="user-profile__details-item">
          <Paper elevation={0}>
            <Grid2 container spacing={1}>
              <Grid2 size={{ xs: 4 }} container alignItems="center">
                <Typography variant="body1" fontWeight="500">
                  {item.type}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 8 }}>
                {item.primary && (
                  <Typography variant="body2">
                    {item.primary} {item?.secondary && '(Primary)'}
                  </Typography>
                )}
                {item.secondary && (
                  <Typography variant="body2">
                    {item.secondary} ({en.profilePage.profileTabs.contacts.secondary})
                  </Typography>
                )}
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>
      ))}
      <Box alignItems="center" width="100%">
        <Typography
          variant="body1"
          className="user-profile__delete-account"
          onClick={toggleDialog}
          sx={{ cursor: 'pointer', fontWeight: 400, textAlign: 'center', textDecoration: 'underline', mt: 2 }}
        >
          {en.profilePage.profileTabs.contacts.deleteAccount}
        </Typography>
      </Box>
      <DialogConfirmBox
        open={openDialog}
        onClose={toggleDialog}
        onConfirm={() => handleDeleteAccount()}
        title={en.common.deleteAccount}
        description={en.common.deleteAccountMessage}
        confirmText={en.common.delete}
      />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid2>
  );
};
