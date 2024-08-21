'use client';
import React, { useCallback, useMemo } from 'react';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SearchEventProps {
  searchParams?: string | false | string[] | undefined;
  type: 'event' | 'brand';
}

const SearchEvent: React.FC<SearchEventProps> = ({ searchParams, type }) => {
  const [searchTerm, setSearchTerm] = useState<string>(typeof searchParams === 'string' ? searchParams : '');
  const router = useRouter();

  const href = useMemo(() => (type === 'event' ? 'events' : 'home'), [type]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      router.push(`/${href}?name=${encodeURIComponent(trimmedTerm)}`);
    }
  }, [searchTerm, router, href]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    router.push(`/${href}`);
  }, [router, href]);

  useEffect(() => {
    if (typeof searchParams === 'string' && searchParams !== searchTerm) {
      setSearchTerm(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Box my={2.5}>
      <SearchBar
        searchTerm={searchTerm}
        placeholder="Search for anything..."
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleClear={handleClear}
        aria-label="Search events"
        searchWithSuggestions={true}
      />
    </Box>
  );
};

export default SearchEvent;
