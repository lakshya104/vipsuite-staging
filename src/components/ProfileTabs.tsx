'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid, Typography } from '@mui/material';
import { BioComponent, ContactsComponent, SocialComponent } from './ProfileComponents';
import { ACF } from '@/interfaces';
import { isUndefined } from 'lodash';

const TABS = [
  { section: 'bio', label: 'Bio' },
  { section: 'social', label: 'Social' },
  { section: 'contacts', label: 'Contacts' },
];

interface ProfileTabsProps {
  profileData: ACF;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ profileData }) => {
  const [section, setSection] = useState<string>('bio');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSection(TABS[newValue]?.section);
  };

  const currentSection = section;
  const currentTabIndex = TABS.findIndex((tab) => tab?.section === currentSection) || 0;

  const renderSection = () => {
    switch (section) {
      case 'bio':
        return <BioComponent profileDetails={profileData} />;
      case 'social':
        return <SocialComponent profileDetails={profileData} />;
      case 'contacts':
        return <ContactsComponent profileDetails={profileData} />;
      default:
        return <BioComponent profileDetails={profileData} />;
    }
  };

  if (!profileData || isUndefined(profileData)) {
    return (
      <Box className="user-profile__details">
        <Grid container>
          <Grid item xs={12} className="user-profile__details-item">
            <Typography textAlign={'center'} variant="body1" fontWeight="500">
              Profile not available currently
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Tabs value={currentTabIndex} onChange={handleChange} aria-label="profile tabs" className="user-profile__tabs">
          {TABS.map((tab) => (
            <Tab key={tab.section} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box className="user-profile__details">{renderSection()}</Box>
    </>
  );
};

export default ProfileTabs;
