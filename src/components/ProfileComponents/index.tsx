import { ACF } from '@/interfaces';
import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

interface ProfileComponentProps {
  profileDetails: ACF;
}

export const BioComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const bioData = [
    { label: 'Date of Birth', value: profileDetails?.date_of_birth || 'N/A' },
    { label: 'Born', value: profileDetails?.birth_place || 'N/A' },
    { label: 'Resides', value: profileDetails?.nationality || 'N/A' },
    {
      label: 'Interests',
      value:
        profileDetails?.interests && profileDetails.interests.length > 0 ? profileDetails.interests.join(', ') : 'N/A',
    },
  ];
  return (
    <Grid container>
      {bioData.map((item, index) => (
        <Grid item xs={12} key={index} className="user-profile__details-item">
          <Paper elevation={0}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="body1" fontWeight="500">
                  {item.label}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{item.value}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export const SocialComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const socialData = [
    { platform: 'Instagram', handle: profileDetails?.instagram_handle || 'N/A' },
    { platform: 'LinkedIn', handle: profileDetails?.tiktok_handle || 'N/A' },
  ];
  return (
    <Grid container>
      {socialData.map((item, index) => (
        <Grid item xs={12} key={index} className="user-profile__details-item">
          <Paper elevation={0}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="body1" fontWeight="500">
                  {item.platform}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{item.handle}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export const ContactsComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const contactData = [
    { type: 'Email', value: 'N/A' },
    { type: 'Phone', value: profileDetails?.phone || 'N/A' },
    // { type: 'Address', value: 'N/A' },
  ];
  return (
    <Grid container>
      {contactData.map((item, index) => (
        <Grid item xs={12} key={index} className="user-profile__details-item">
          <Paper elevation={0}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="body1" fontWeight="500">
                  {item?.type}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{item?.value}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
