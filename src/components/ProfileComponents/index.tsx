import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

interface ProfileDetails {
  first_name: string;
  last_name: string;
  created_by: number;
  created_by_type: string;
  type_of_representation: string;
  avg_engagement: string;
  instagram_handle: string;
  tiktok_handle: string;
  known_for: string[];
  event_contacts: {
    [key: string]: string;
  };
  stylist_contacts: {
    [key: string]: string;
  };
  gifting_contacts: {
    [key: string]: string;
  };
  date_of_birth: string;
  birth_place: string;
  nationality: string;
  ethnicity: string;
  number_of_childs: string;
  child_info: {
    [key: string]: string;
  }[];
  pets: string;
  home_post_code: string;
  habits: string[];
  sports_play: string;
  other_sports: string;
  sports_follow: string;
  skills: string;
  look_feel_of_socials: string;
  interests: string[];
  associated_brands: boolean;
  secondary_email: string;
  phone: string;
}
interface ProfileComponentProps {
  profileDetails: ProfileDetails;
}

export const BioComponent: React.FC<ProfileComponentProps> = ({ profileDetails }) => {
  const bioData = [
    { label: 'Date of Birth', value: profileDetails?.date_of_birth || 'N/A' },
    { label: 'Born', value: profileDetails?.birth_place || 'N/A' },
    { label: 'Resides', value: profileDetails?.nationality || 'N/A' },
    {
      label: 'Interests',
      value: profileDetails.interests.length > 0 ? profileDetails.interests.join(', ') : 'N/A',
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
    { platform: 'Instagram', handle: profileDetails?.instagram_handle },
    { platform: 'LinkedIn', handle: profileDetails?.tiktok_handle },
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
    { type: 'Email', value: 'example@example.com' },
    { type: 'Phone', value: profileDetails?.phone },
    { type: 'Address', value: '123 Example Street, London, UK' },
  ];
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
