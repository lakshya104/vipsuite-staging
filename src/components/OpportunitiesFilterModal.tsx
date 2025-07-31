import Image from 'next/image';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, IconButton, ImageList, Modal } from '@mui/material';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';

interface OpportunitiesFilterModalProps {
  isFilterOpen: boolean;
  closeFilter: () => void;
  clearFilter: () => void;
  // eslint-disable-next-line no-unused-vars
  handleFilter: (categoryId: number) => void;
  categories: { id: number; name: string; emoji_url?: string; url?: string }[];
  selectedCategoryId: number | null;
}

const OpportunitiesFilterModal: React.FC<OpportunitiesFilterModalProps> = ({
  isFilterOpen,
  closeFilter,
  handleFilter,
  categories,
  selectedCategoryId,
  clearFilter,
}) => {
  return (
    <Modal open={isFilterOpen} onClose={closeFilter}>
      <Box className="filter-modal">
        <Box className="filter-modal__close-btn">
          <IconButton aria-label="Close" onClick={closeFilter} sx={{ color: 'text.primary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="filter-modal__clear-btn">
          <Button variant="text" onClick={clearFilter}>
            {en.opportunities.clearFilter}
          </Button>
        </Box>

        {categories.length > 0 ? (
          <ImageList cols={2} gap={16} sx={{ mt: 4 }}>
            {categories.map((category) => (
              <Box
                className="filter-modal__image-list"
                key={category?.id}
                sx={{
                  cursor: 'pointer',
                  minHeight: { xs: '80px', md: '100px' },
                  border: selectedCategoryId === category?.id ? '2px solid black' : '1px solid rgba(223,225,227,255)',
                }}
                onClick={() => handleFilter(category.id)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: selectedCategoryId === category?.id ? '#babab8' : '#EBEBE3',
                    height: '100%',
                    justifyContent: 'center',
                    gap: 5,
                  }}
                >
                  <Box className="filter-modal__list-icon">
                    {category?.emoji_url && (
                      <Image
                        src={category?.emoji_url || DefaultImageFallback.Placeholder}
                        alt={`${category?.name} icon`}
                        width={30}
                        height={30}
                      />
                    )}
                    <span>{category?.name}</span>
                  </Box>
                </Box>
              </Box>
            ))}
          </ImageList>
        ) : (
          <Box
            className="filter-modal__loader"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: { xs: '200px', md: '400px' } }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default OpportunitiesFilterModal;
