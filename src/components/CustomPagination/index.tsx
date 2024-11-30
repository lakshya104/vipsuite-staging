'use client';
import React, { useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange?: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
      if (onPageChange) onPageChange(page);
    });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mt: 4,
      }}
    >
      <Button
        className="button button--black"
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        sx={{ textTransform: 'none' }}
      >
        <ArrowBackIcon />
      </Button>

      <Typography variant="body1" component="span" fontWeight={500}>
        Page {currentPage} of {totalPages}
      </Typography>

      <Button
        className="button button--black"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        sx={{ textTransform: 'none' }}
      >
        <ArrowForwardIcon />
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default CustomPagination;
