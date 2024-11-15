'use client';
import React from 'react';
import { get } from 'lodash';
import { formatDateWithMonth } from '@/helpers/utils';
import { UserProfile } from '@/interfaces';
import { Grid, Paper, Typography } from '@mui/material';

interface ProfileComponentProps {
  profileDetails: UserProfile;
  isAgent?: boolean;
}

export const BioComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const dateOfBirth = get(profileDetails, 'acf.date_of_birth', '');
  const bioData = [
    { label: 'Date of Birth', value: dateOfBirth && formatDateWithMonth(dateOfBirth) },
    { label: 'Born', value: get(profileDetails, 'acf.birth_place', '') },
    { label: 'Resides', value: get(profileDetails, 'acf.nationality', '') },
    {
      label: 'Interests',
      value:
        get(profileDetails, 'acf.interests', []).length > 0 ? get(profileDetails, 'acf.interests', []).join(', ') : '',
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

export const ContactsComponent: React.FC<ProfileComponentProps> = ({ profileDetails, isAgent }) => {
  const contactData = [
    {
      type: 'Email',
      primary: get(profileDetails, 'email', ''),
    },
    {
      type: 'Phone',
      primary: get(profileDetails, 'acf.phone', ''),
    },
    ...(isAgent
      ? [
          {
            type: 'Company Name',
            primary: get(profileDetails, 'acf.company_name', ''),
          },
        ]
      : []),
  ];

  const filteredContactData = contactData.filter((contact) => contact.primary);

  return (
    <Grid container>
      {filteredContactData.map((item, index) => (
        <Grid item xs={12} key={index} className="user-profile__details-item">
          <Paper elevation={0}>
            <Grid container spacing={1}>
              <Grid item xs={4} container alignItems="center">
                <Typography variant="body1" fontWeight="500">
                  {item.type}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {item.primary && (
                  <Typography variant="body2">
                    {item.primary} {item.type.includes('Contact') && '(Primary)'}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
