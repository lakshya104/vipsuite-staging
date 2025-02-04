import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import OpportunitiesFilterModal from './OpportunitiesFilterModal';
import { GetOpportunityCategory } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import en from '@/helpers/lang';

interface FilterButtonProps {
  isFilterOpen: boolean;
  closeFilter: () => void;
  clearFilter: () => void;
  openFilter: () => void;
  isFilterApplied: string | null;
  // eslint-disable-next-line no-unused-vars
  handleFilter: (categoryId: number) => void;
  selectedCategoryId: number | null;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  openFilter,
  selectedCategoryId,
  isFilterApplied,
  clearFilter,
  closeFilter,
  handleFilter,
  isFilterOpen,
}) => {
  const [categories, setCategories] = useState<{ id: number; name: string; emoji_url: string; url: string }[]>([]);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  useEffect(() => {
    const fetchRedeemOffers = async () => {
      try {
        const response = await GetOpportunityCategory();
        const categoryList = response.map(
          (item: { id: number; name: string; acf: { image: { url: string }; emoji_icon: { url: string } } }) => ({
            id: item.id,
            name: item.name,
            url: item.acf.image.url,
            emoji_url: item.acf.emoji_icon.url,
          }),
        );
        setCategories(categoryList);
      } catch (err) {
        console.error(en.redeemBox.errMessage, ':', err);
        openToaster(err?.toString() ?? en.redeemBox.errMessage + '.');
      }
    };
    fetchRedeemOffers();
  }, [openToaster]);

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
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default FilterButton;
