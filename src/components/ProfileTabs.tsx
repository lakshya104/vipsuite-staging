'use client';
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

const TABS = [
  { section: 'bio', label: 'Bio' },
  { section: 'social', label: 'Social' },
  { section: 'contacts', label: 'Contacts' },
];

const ProfileTabs: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(`/profile?section=${TABS[newValue].section}`);
  };

  const currentSection = searchParams.get('section') || 'bio';
  const currentTabIndex = TABS.findIndex((tab) => tab.section === currentSection) || 0;

  return (
    <Box>
      <Tabs
        value={currentTabIndex}
        onChange={handleChange}
        aria-label="profile tabs"
        className="user-profile__tabs"
      >
        {TABS.map((tab) => (
          <Tab key={tab.section} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
