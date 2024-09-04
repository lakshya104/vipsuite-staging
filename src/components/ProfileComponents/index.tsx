import { ACF } from '@/interfaces';
import { Grid, Paper, Typography } from '@mui/material';
import { get } from 'lodash';
import React from 'react';

interface ProfileComponentProps {
  profileDetails: ACF;
}
const handleEmpty = (value: string | null) => (value === undefined || value === null || value === '' ? 'N/A' : value);

export const BioComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const bioData = [
    { label: 'Date of Birth', value: handleEmpty(get(profileDetails, 'date_of_birth', '')) },
    { label: 'Born', value: handleEmpty(get(profileDetails, 'birth_place', '')) },
    { label: 'Resides', value: handleEmpty(get(profileDetails, 'nationality', '')) },
    {
      label: 'Interests',
      value: get(profileDetails, 'interests', []).length > 0 ? get(profileDetails, 'interests', []).join(', ') : 'N/A',
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
    { platform: 'Instagram', handle: handleEmpty(get(profileDetails, 'instagram_handle', '')) },
    { platform: 'LinkedIn', handle: handleEmpty(get(profileDetails, 'tiktok_handle', '')) },
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
    { type: 'Email', value: handleEmpty('') },
    { type: 'Phone', value: handleEmpty(get(profileDetails, 'phone', '')) },
    { type: 'Event Contact', value: handleEmpty(get(profileDetails, 'event_contacts.email', '')) },
    { type: 'Stylist Contact', value: handleEmpty(get(profileDetails, 'stylist_contacts.email', '')) },
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
