'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchBarDropdown from './SearchBarDropdown';

interface HomeSearchBarProps {
  type?: string | false | string[] | undefined;
}

const HomeSearchBar: React.FC<HomeSearchBarProps> = ({ type }) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>('');
  const [selectedOption, setSelectedOption] = useState<string>('events');
  const router = useRouter();
  useEffect(() => {
    if (type && type !== selectedOption) {
      router.push(`/events?type=${encodeURIComponent(selectedOption)}`);
    }
  }, [type, router, selectedOption]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    const trimmedTerm = searchTerm?.trim();
    if (trimmedTerm) {
      router.push(`/${selectedOption}?search=${encodeURIComponent(trimmedTerm)}`);
    }
  }, [searchTerm, selectedOption, router]);

  const handleOptionChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  }, []);

  return (
    <Box my={2.5}>
      <SearchBarDropdown
        searchTerm={searchTerm}
        placeholder="Search for anything..."
        handleChange={handleChange}
        handleSearch={handleSearch}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
      />
    </Box>
  );
};

export default HomeSearchBar;
