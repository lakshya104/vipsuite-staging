import { formatDateWithMonth } from '@/helpers/utils';
import { UserProfile } from '@/interfaces';
import { Grid, Paper, Typography } from '@mui/material';
import { get } from 'lodash';
import React from 'react';

interface ProfileComponentProps {
  profileDetails: UserProfile;
}

export const BioComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const bioData = [
    { label: 'Date of Birth', value: formatDateWithMonth(get(profileDetails, 'acf.date_of_birth', '')) },
    { label: 'Born', value: get(profileDetails, 'acf.birth_place', '') },
    { label: 'Resides', value: get(profileDetails, 'acf.nationality', '') },
    {
      label: 'Interests',
      value: get(profileDetails, 'interests', []).length > 0 ? get(profileDetails, 'acf.interests', []).join(', ') : '',
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
    { platform: 'Instagram', handle: get(profileDetails, 'acf.instagram_handle', '') },
    { platform: 'Tik-Tok', handle: get(profileDetails, 'acf.tiktok_handle', '') },
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

export const ContactsComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const contactData = [
    { type: 'Email', value: get(profileDetails, 'email', '') },
    { type: 'Phone', value: get(profileDetails, 'acf.phone', '') },
    { type: 'Secondary Email', value: get(profileDetails, 'acf.secondary_email', '') },
    { type: 'Primary Event Contact', value: get(profileDetails, 'acf.event_contacts.email', '') },
    { type: 'Secondary Event Contact', value: get(profileDetails, 'acf.event_contacts.secondary_email', '') },
    { type: 'Primary Stylist Contact', value: get(profileDetails, 'acf.stylist_contacts.email', '') },
    {
      type: 'Secondary Stylist Contact',
      value: get(profileDetails, 'acf.stylist_contacts.secondary_email', ''),
    },
    { type: 'Primary Commercial Opportunity Contact', value: get(profileDetails, 'acf.stylist_contacts.email', '') },
    {
      type: 'Secondary Commercial Opportunity Contact',
      value: get(profileDetails, 'acf.stylist_contacts.secondary_email', ''),
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
