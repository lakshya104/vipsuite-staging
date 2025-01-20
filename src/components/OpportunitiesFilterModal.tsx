import Image from 'next/image';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
} from '@mui/material';
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
              <ImageListItem
                className="filter-modal__image-list"
                key={category?.id}
                sx={{
                  cursor: 'pointer',
                  border: selectedCategoryId === category?.id ? '1px solid gray' : '1px solid transparent',
                }}
                onClick={() => handleFilter(category.id)}
              >
                <Image
                  height={200}
                  width={200}
                  src={category?.url ?? DefaultImageFallback.Placeholder}
                  alt={category?.name}
                  loading="lazy"
                />
                {selectedCategoryId === category?.id && <CheckCircleIcon className="filter-modal__circle-icon" />}
                <ImageListItemBar
                  className="filter-modal__list-item"
                  title={
                    <Box className="filter-modal__list-icon">
                      {category?.name}
                      {category?.emoji_url && (
                        <Image src={category?.emoji_url} alt={`${category?.name} icon`} width={24} height={24} />
                      )}
                    </Box>
                  }
                />
              </ImageListItem>
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
