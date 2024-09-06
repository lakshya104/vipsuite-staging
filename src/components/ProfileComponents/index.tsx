import { formatDateWithMonth } from '@/helpers/utils';
import { ACF } from '@/interfaces';
import { Grid, Paper, Typography } from '@mui/material';
import { get } from 'lodash';
import React from 'react';

interface ProfileComponentProps {
  profileDetails: ACF;
  email?: string;
}

export const BioComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const bioData = [
    { label: 'Date of Birth', value: formatDateWithMonth(get(profileDetails, 'date_of_birth', '')) },
    { label: 'Born', value: get(profileDetails, 'birth_place', '') },
    { label: 'Resides', value: get(profileDetails, 'nationality', '') },
    {
      label: 'Interests',
      value: get(profileDetails, 'interests', []).length > 0 ? get(profileDetails, 'interests', []).join(', ') : 'N/A',
    },
  ];
  const filteredBioData = bioData.filter((data) => data.value !== '');
  return (
    <Grid container>
      {filteredBioData.map((item, index) => (
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
    { platform: 'Instagram', handle: get(profileDetails, 'instagram_handle', '') },
    { platform: 'Tik-Tok', handle: get(profileDetails, 'tiktok_handle', '') },
  ];
  const filteredSocialData = socialData.filter((data) => data.handle !== '');
  return (
    <Grid container>
      {filteredSocialData.map((item, index) => (
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

export const ContactsComponent: React.FC<ProfileComponentProps> = ({ profileDetails, email }) => {
  const contactData = [
    { type: 'Email', value: email || '' },
    { type: 'Phone', value: get(profileDetails, 'phone', '') },
    { type: 'Secondary Email', value: get(profileDetails, 'secondary_email', '') },
    { type: 'Primary Event Contact', value: get(profileDetails, 'event_contacts.email', '') },
    { type: 'Secondary Event Contact', value: get(profileDetails, 'event_contacts.secondary_email', '') },
    { type: 'Primary Stylist Contact', value: get(profileDetails, 'stylist_contacts.email', '') },
    {
      type: 'Secondary Stylist Contact',
      value: get(profileDetails, 'stylist_contacts.secondary_email', ''),
    },
    { type: 'Primary Gifting Contact', value: get(profileDetails, 'stylist_contacts.email', '') },
    {
      type: 'Secondary Gifting Contact',
      value: get(profileDetails, 'stylist_contacts.secondary_email', ''),
    },
  ];
  const filteredContactData = contactData.filter((contact) => contact.value !== '');
  return (
    <Grid container>
      {filteredContactData.map((item, index) => (
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
