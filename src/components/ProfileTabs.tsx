'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { BioComponent, ContactsComponent, SocialComponent } from './ProfileComponents';
import { ACF } from '@/interfaces';

const TABS = [
  { section: 'bio', label: 'Bio' },
  { section: 'social', label: 'Social' },
  { section: 'contacts', label: 'Contacts' },
];

interface ProfileTabsProps {
  profileData: ACF;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ profileData }) => {
  const [section, setSection] = useState('bio');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSection(TABS[newValue].section);
  };

  const currentSection = section;
  const currentTabIndex = TABS.findIndex((tab) => tab.section === currentSection) || 0;

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
