'use client';
import React, { ChangeEvent } from 'react';
import { InputAdornment, TextField, Box, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarDropdownProps {
  searchTerm: string | undefined;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch?: () => void;
  selectedOption: string;
  // eslint-disable-next-line no-unused-vars
  handleOptionChange: (event: SelectChangeEvent<string>) => void;
}

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({
  searchTerm,
  handleChange,
  placeholder,
  handleSearch,
  selectedOption,
  handleOptionChange,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && handleSearch) {
      handleSearch();
    }
  };

  return (
    <Box className="search-box" display="flex" alignItems="center">
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        variant="outlined"
        style={{ marginLeft: '8px', minWidth: '100px' }}
      >
        <MenuItem value="events">Events</MenuItem>
        <MenuItem value="brands">Brands</MenuItem>
      </Select>
    </Box>
  );
};

export default SearchBarDropdown;
