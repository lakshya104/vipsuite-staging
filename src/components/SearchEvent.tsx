'use client';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SearchEventProps {
  searchParams?: string | false | string[] | undefined;
}

const SearchEvent: React.FC<SearchEventProps> = ({ searchParams }) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    typeof searchParams === 'string' ? searchParams : '',
  );
  const router = useRouter();

  useEffect(() => {
    if (searchParams && searchTerm === '') {
      setSearchTerm('');
      router.push('/home');
    }
  }, [searchParams, searchTerm, router]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    const trimmedTerm = searchTerm?.trim();
    if (trimmedTerm) {
      router.push(`/home?name=${encodeURIComponent(trimmedTerm)}&filter=all`);
    }
  }, [searchTerm, router]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    router.push('/home');
  }, [router]);

  return (
    <Box my={2.5}>
      <SearchBar
        searchTerm={searchTerm}
        placeholder="Search for anything..."
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleClear={handleClear}
        searchWithSuggestions={true}
      />
    </Box>
  );
};

export default SearchEvent;
