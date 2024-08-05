import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const bioData = [
  { label: 'Date of Birth', value: '31 Jan 1990' },
  { label: 'Born', value: 'London, United Kingdom' },
  { label: 'Resides', value: 'London, United Kingdom' },
  {
    label: 'Interests',
    value:
      'Animals, Body Positivity, Dogs, Environment, Feminism, Foodie, Health, Music, Race Issues, Tennis, Theatre, Wrestling, Yoga',
  },
];

export const BioComponent = () => {
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

const socialData = [
  { platform: 'Twitter', handle: '@example' },
  { platform: 'Instagram', handle: '@example' },
  { platform: 'LinkedIn', handle: 'example-linkedin' },
  { platform: 'Facebook', handle: 'example-facebook' },
];

export const SocialComponent = () => {
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

const contactData = [
  { type: 'Email', value: 'example@example.com' },
  { type: 'Phone', value: '+1234567890' },
  { type: 'Address', value: '123 Example Street, London, UK' },
];

export const ContactsComponent = () => {
  return (
    <Grid container>
      {contactData.map((item, index) => (
        <Grid item xs={12} key={index} className="user-profile__details-item">
          <Paper elevation={0}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="body1" fontWeight="500">
                  {item.type}
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
