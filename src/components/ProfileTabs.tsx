'use client';
import React, { Suspense } from 'react';
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
  const currentTabIndex = TABS.findIndex((tab) => tab.section === currentSection);

  return (
    <Box>
      <Tabs
        value={currentTabIndex !== -1 ? currentTabIndex : 0}
        onChange={handleChange}
        aria-label="profile tabs"
        className="user-profile__tabs"
      >
        {TABS.map((tab, index) => (
          <Tab key={tab.section} label={tab.label} value={index} />
        ))}
      </Tabs>
    </Box>
  );
};

const ProfilePageTabs: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileTabs />
    </Suspense>
  );
};

export default ProfilePageTabs;
