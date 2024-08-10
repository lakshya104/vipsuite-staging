'use client';
import React, { useCallback, useMemo } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchFilterTabsProps {
  searchQuery: string | false | string[] | undefined;
}

const tabs = ['all', 'newest', 'expiringSoon'];

const SearchFilterTabs: React.FC<SearchFilterTabsProps> = ({ searchQuery }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get('filter') || 'all';
  const currentTabIndex = tabs.indexOf(currentFilter);

  const encodedSearchQuery = useMemo(
    () => (typeof searchQuery === 'string' ? encodeURIComponent(searchQuery) : ''),
    [searchQuery],
  );

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      const newFilter = tabs[newValue];
      if (encodedSearchQuery) {
        router.push(`/home?name=${encodedSearchQuery}&filter=${newFilter}`);
      }
    },
    [router, encodedSearchQuery],
  );

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

export default React.memo(SearchFilterTabs);
