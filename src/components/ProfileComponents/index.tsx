'use client';
import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid2, Paper, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddIcon from '@mui/icons-material/Add';
import { UserProfile } from '@/interfaces';
import { expiryDate, formatDateWithMonth } from '@/helpers/utils';
import ErrorFallback from '../ErrorFallback';
import en from '@/helpers/lang';
import { UpdateSocials } from '@/libs/api-manager/manager';
import { useInstaInfo, useTiktokInfo } from '@/store/useStore';
import { EditSocialLinksRequestBody, EditSocialLinksSchema } from './types';
import InputForm from '../InputForm/InputForm';

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
    openInsta: false,
    openTiktok: false,
  });
  const [loading, setLoading] = useState(false);
  const { instaInfo, setInstaInfo } = useInstaInfo();
  const { tiktokInfo, setTiktokInfo } = useTiktokInfo();
  const instaHydrated = useInstaInfo((state) => state.hydrated);
  const tiktokHydrated = useTiktokInfo((state) => state.hydrated);
  const hydrated = instaHydrated && tiktokHydrated;
  const setInstaHydrated = useInstaInfo((state) => state.setHydrated);
  const setTiktokHydrated = useTiktokInfo((state) => state.setHydrated);

  const [socialLinks, setSocialLinks] = useState({
    instagram_handle: get(profileDetails, 'acf.instagram_handle', '') || instaInfo.username,
    tiktok_handle: get(profileDetails, 'acf.tiktok_handle', '') || tiktokInfo.username,
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditSocialLinksRequestBody>({
    resolver: zodResolver(EditSocialLinksSchema),
    defaultValues: socialLinks,
  });

  useEffect(() => {
    setTimeout(() => {
      setInstaHydrated(true);
      setTiktokHydrated(true);
    }, 500);
  }, [setInstaHydrated, setTiktokHydrated]);

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
        instagram_handle: data.instagram_handle || get(profileDetails, 'acf.instagram_handle', ''),
        tiktok_handle: data.tiktok_handle || get(profileDetails, 'acf.tiktok_handle', ''),
      });
      setInstaInfo({
        username: data.instagram_handle || '',
        code: instaInfo.code,
        followers: instaInfo.followers,
        picture: instaInfo.picture,
        expires: instaInfo.expires || 0,
      });
      setTiktokInfo({
        username: data.tiktok_handle || '',
        code: tiktokInfo.code,
        refreshCode: tiktokInfo.refreshCode,
        followers: tiktokInfo.followers,
        expires: tiktokInfo.expires || 0,
        picture: tiktokInfo.picture || '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
      setOpenForm({
        openInsta: false,
        openTiktok: false,
      });
      reset();
    }
  };

  return (
    <Grid2 container>
      {openForm.openInsta || openForm.openTiktok ? (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
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
                            <InputForm
                              {...field}
                              type="text"
                              name="instagram_handle"
                              placeholder="Instagram"
                              autoFill={true}
                              error={!!errors['instagram_handle']}
                              helperText={errors['instagram_handle']?.message}
                            />
                          )}
                        />
                        <Box sx={{ mt: -3 }}>
                          <Button
                            sx={{
                              textDecoration: !hydrated || !!instaInfo.code || !loading ? 'underline' : '',
                              textTransform: 'capitalize',
                              mr: 1,
                            }}
                            disabled={!hydrated || !!instaInfo.code || loading}
                            onClick={openInstagramAuth}
                          >
                            {getInstagramButtonText()}
                          </Button>
                          <Button
                            disabled={loading}
                            sx={{ textDecoration: !loading ? 'underline' : '', textTransform: 'capitalize' }}
                            type="submit"
                          >
                            {loading ? 'Saving...' : 'Save'}
                          </Button>
                        </Box>
                      </>
                    ) : socialLinks.instagram_handle ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{socialLinks.instagram_handle}</Typography>
                        <Button
                          onClick={() =>
                            setOpenForm({
                              openInsta: true,
                              openTiktok: false,
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
                              openInsta: true,
                              openTiktok: false,
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
                            <InputForm
                              {...field}
                              type="text"
                              name="tiktok_handle"
                              placeholder="Tik-Tok"
                              autoFill={true}
                              error={!!errors['tiktok_handle']}
                              helperText={errors['tiktok_handle']?.message}
                            />
                          )}
                        />
                        <Box sx={{ mt: -3 }}>
                          <Button
                            sx={{
                              textDecoration: !hydrated || !!instaInfo.code || !loading ? 'underline' : '',
                              textTransform: 'capitalize',
                              mr: 1,
                            }}
                            disabled={!hydrated || !!instaInfo.code || loading}
                            onClick={openTikTokAuth}
                          >
                            {getTikTokText()}
                          </Button>
                          <Button
                            disabled={loading}
                            sx={{ textDecoration: !loading ? 'underline' : '', textTransform: 'capitalize' }}
                            type="submit"
                          >
                            {loading ? 'Saving...' : 'Save'}
                          </Button>
                        </Box>
                      </>
                    ) : socialLinks.tiktok_handle ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{socialLinks.tiktok_handle}</Typography>
                        <Button
                          onClick={() =>
                            setOpenForm({
                              openInsta: false,
                              openTiktok: true,
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
                              openInsta: false,
                              openTiktok: true,
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
          </>
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
                            openInsta: item.name === 'instagram_handle',
                            openTiktok: item.name === 'tiktok_handle',
                          })
                        }
                        sx={{ border: '0.5px solid', borderColor: 'grey.500', borderRadius: 2, padding: 0.5 }}
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
    </Grid2>
  );
};
