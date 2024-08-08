'use client';
import React, { useMemo } from 'react';
import { Tabs, Tab, Box, styled, SxProps, Theme } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchFilterTabsProps {
  searchQuery: string | false | string[] | undefined;
  sx?: SxProps<Theme>;
}

const SearchFilterTabs: React.FC<SearchFilterTabsProps> = ({ searchQuery, sx }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabs = useMemo(() => ['all', 'newest', 'expiringSoon'], []);

  const currentFilter = searchParams.get('filter') || 'all';
  const currentTabIndex = tabs.indexOf(currentFilter);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const newFilter = tabs[newValue];
    if (typeof searchQuery === 'string') {
      router.push(`/home?name=${encodeURIComponent(searchQuery)}&filter=${newFilter}`);
    }
  };

  return (
    <Box>
      <Tabs value={currentTabIndex} onChange={handleChange} aria-label="filter tabs" className="landing-page__tabs">
        <Tab label="All" />
        <Tab label="Newest" />
        <Tab label="Expiring Soon" />
      </Tabs>
    </Box>
  );
};

export default SearchFilterTabs;
