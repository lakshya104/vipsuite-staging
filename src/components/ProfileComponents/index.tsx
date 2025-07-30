'use client';
import React, { useState, useTransition } from 'react';
import { get } from 'lodash';
import { formatDateWithMonth } from '@/helpers/utils';
import { UserProfile } from '@/interfaces';
import { Backdrop, Box, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import ErrorFallback from '../ErrorFallback';
import en from '@/helpers/lang';
import { DeleteAccount } from '@/libs/api-manager/manager';
import { signOutAction } from '@/libs/actions';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';
import DialogConfirmBox from '../Dialog/DialogConfirm';

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
  const socialData = [
    { platform: en.profilePage.profileTabs.social.instagram, handle: get(profileDetails, 'acf.instagram_handle', '') },
    { platform: en.profilePage.profileTabs.social.tikTok, handle: get(profileDetails, 'acf.tiktok_handle', '') },
  ];
  const filteredSocialData = socialData.filter((data) => data.handle !== '');
  if (filteredSocialData.length === 0) {
    return (
      <ErrorFallback
        halfHeight={true}
        errorMessage={en.listEmptyMessage.noSocialData}
        hideSubtext={true}
        subtext={en.listEmptyMessage.noContactDataMessage}
      />
    );
  }
  return (
    <Grid2 container>
      {filteredSocialData.map((item, index) => (
        <Grid2 size={{ xs: 12 }} key={index} className="user-profile__details-item">
          <Paper elevation={0}>
            <Grid2 container>
              <Grid2 size={{ xs: 4 }}>
                <Typography variant="body1" fontWeight="500">
                  {item.platform}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 8 }}>
                <Typography variant="body2">{item.handle}</Typography>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>
      ))}
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
