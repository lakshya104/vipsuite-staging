'use client';
import React from 'react';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (typeof searchTerm === 'string' && searchTerm.trim()) {
      router.push(`/home?name=${encodeURIComponent(searchTerm)}&filter=all`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    router.push('/home');
  };

  return (
    <Box sx={{ pt: 2, mb: '30px' }}>
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
