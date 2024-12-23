import React from 'react';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import OpportunitiesFilterModal from './OpportunitiesFilterModal';

interface FilterButtonProps {
  isFilterOpen: boolean;
  closeFilter: () => void;
  clearFilter: () => void;
  openFilter: () => void;
  isFilterApplied: string | null;
  // eslint-disable-next-line no-unused-vars
  handleFilter: (categoryId: number) => void;
  categories: { id: number; name: string; emoji_url?: string; url?: string }[];
  selectedCategoryId: number | null;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  openFilter,
  selectedCategoryId,
  isFilterApplied,
  categories,
  clearFilter,
  closeFilter,
  handleFilter,
  isFilterOpen,
}) => {
  return (
    <>
      <IconButton
        className="filter-button"
        onClick={openFilter}
        aria-label="Filter opportunities"
        sx={{
          mr: 1,
          bgcolor: selectedCategoryId || isFilterApplied ? '#d4d5d6' : 'transparent',
          '&:hover': {
            bgcolor: selectedCategoryId || isFilterApplied ? '#d4d5d6' : 'transparent',
          },
        }}
      >
        <Image src="/img/Filter.png" alt="Filter" width={30} height={30} />
      </IconButton>
      <OpportunitiesFilterModal
        categories={categories}
        clearFilter={clearFilter}
        closeFilter={closeFilter}
        handleFilter={handleFilter}
        isFilterOpen={isFilterOpen}
        selectedCategoryId={selectedCategoryId}
      />
    </>
  );
};

export default FilterButton;
