'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid2, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import { BioComponent, ContactsComponent, SocialComponent } from './ProfileComponents';
import { ProfileBuilderData, UserProfile } from '@/interfaces';
import en from '@/helpers/lang';

const TABS = [
  { section: 'bio', label: en.profilePage.profileTabs.bio.title },
  { section: 'social', label: en.profilePage.profileTabs.social.title },
  { section: 'contacts', label: en.profilePage.profileTabs.contacts.title },
];

interface ProfileTabsProps {
  profileData: UserProfile;
  profileBuilderData: ProfileBuilderData;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ profileData, profileBuilderData }) => {
  const [section, setSection] = useState<string>('bio');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSection(TABS[newValue]?.section);
  };

  const currentSection = section;
  const currentTabIndex = TABS.findIndex((tab) => tab?.section === currentSection) || 0;

  const renderSection = () => {
    switch (section) {
      case 'bio':
        return <BioComponent profileDetails={profileData} profileBuilderData={profileBuilderData} />;
      case 'social':
        return <SocialComponent profileDetails={profileData} />;
      case 'contacts':
        return <ContactsComponent profileDetails={profileData} />;
      default:
        return <BioComponent profileDetails={profileData} profileBuilderData={profileBuilderData} />;
    }
  };

  if (!profileData || isUndefined(profileData)) {
    return (
      <Box className="user-profile__details">
        <Grid2 container>
          <Grid2 size={{ xs: 12 }} className="user-profile__details-item">
            <Typography textAlign={'center'} variant="body1" fontWeight="500">
              {en.profilePage.noProfile}
            </Typography>
          </Grid2>
        </Grid2>
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
