'use client';
import React, { ChangeEvent, FC, useState } from 'react';
import { IconButton, InputAdornment, TextField, Box, MenuItem, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './SearchBar.scss';

interface SearchBarProps {
  searchTerm: string | false | string[] | undefined;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
  handleSearch?: (() => void | undefined) | undefined;
  searchWithSuggestions?: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  handleChange,
  handleClear,
  placeholder,
  handleSearch,
  searchWithSuggestions,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setIsMenuOpen(true);
    if (event.key === 'Enter' && handleSearch) {
      handleSearch();
      setIsMenuOpen(false);
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
    handleSearch && handleSearch();
  };

  return (
    <Box className="search-box">
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={handleSearch && handleKeyPress}
        onFocus={() => setIsMenuOpen(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment className='search-box__icon' position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchTerm && handleClear && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {searchTerm && searchWithSuggestions && isMenuOpen && (
        <Box className="search-box__popover">
          <MenuItem onClick={handleMenuClick}>
            Search for&nbsp;<Typography>{searchTerm}</Typography>
          </MenuItem>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
