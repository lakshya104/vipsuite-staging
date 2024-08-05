'use client';
import React, { useMemo } from 'react';
import { Tabs, Tab, Box, styled, SxProps, Theme } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchFilterTabsProps {
  searchQuery: string | false | string[] | undefined;
  sx?: SxProps<Theme>;
}

const StyledTabs = styled(Tabs)({
  minHeight: '36px',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: '36px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 'normal',
  fontSize: '14px',
  color: theme.palette.text.primary,
  backgroundColor: '#EBEBE3',
  '&.Mui-selected': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    borderRadius: '4px',
  },
}));

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
    <Box sx={{ ...sx }}>
      <StyledTabs value={currentTabIndex} onChange={handleChange} aria-label="filter tabs">
        <StyledTab label="All" />
        <StyledTab label="Newest" />
        <StyledTab label="Expiring Soon" />
      </StyledTabs>
    </Box>
  );
};

export default SearchFilterTabs;
