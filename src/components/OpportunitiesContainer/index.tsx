'use client';
import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from 'lodash';
import { Box, CircularProgress, Backdrop, Grid2, Typography, Skeleton } from '@mui/material';
import { useDebounce } from 'use-debounce';
import useUpdateEffect from '@/hooks/useUpdateEffect';
import SearchBar from '../SearchBar';
import { Opportunity } from '@/interfaces/opportunities';
import OpportunitiesListing from '../OpportunitiesListing';
import './OpportunitiesContainer.scss';
import ErrorFallback from '../ErrorFallback';
import en from '@/helpers/lang';
import FilterButton from '../FilterButton';

interface OpportunitiesContainerProps {
  opportunitiesData: Opportunity[];
}

const OpportunitiesContainer: React.FC<OpportunitiesContainerProps> = ({ opportunitiesData }) => {
  const [isPending, startTransition] = useTransition();
  const [isSearchPending, startSearchTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFilterApplied = searchParams.get('opportunityCategory');
  const isSearchApplied = searchParams.get('search');
  const [searchQuery, setSearchQuery] = useState<string>(isSearchApplied ? isSearchApplied : '');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedCategoryId && isFilterApplied) {
      setSelectedCategoryId(parseInt(isFilterApplied));
    }
  }, [selectedCategoryId, isFilterApplied]);

  useUpdateEffect(() => {
    try {
      startSearchTransition(() => {
        const params = new URLSearchParams(window.location.search);
        if (debouncedSearchQuery) {
          params.set('search', debouncedSearchQuery);
        } else {
          params.delete('search');
        }
        router.push(`?${params.toString()}`, { scroll: false });
        setIsClearing(false);
      });
    } catch (error) {
      console.error(en.opportunities.searchErrorMessage, error);
    }
  }, [debouncedSearchQuery, router]);

  useEffect(() => {
    if (!isFilterApplied) {
      setSelectedCategoryId(null);
    }
  }, [isFilterApplied]);

  const handleFilter = (categoryId: number) => {
    try {
      const sameId = selectedCategoryId === categoryId;
      const newCategoryId = sameId ? null : categoryId;

      if (newCategoryId === null) {
        clearFilter();
      } else {
        setSelectedCategoryId(newCategoryId);
        startTransition(() => {
          const params = new URLSearchParams(searchParams.toString());
          if (newCategoryId) {
            params.set('opportunityCategory', newCategoryId.toString());
          } else {
            params.delete('opportunityCategory');
          }
          router.push(`?${params.toString()}`);
        });
      }
      setIsFilterOpen(false);
    } catch (error) {
      console.error(en.opportunities.filterErrorMessage, error);
    }
  };

  const clearFilter = () => {
    try {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('opportunityCategory');
        router.push(`?${params.toString()}`);
        setSelectedCategoryId(null);
        setIsFilterOpen(false);
      });
    } catch (error) {
      console.error(en.opportunities.filterErrorMessage, error);
    }
  };

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsClearing(true);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setIsClearing(true);
  }, []);

  const renderLoading = () => {
    return (
      <Grid2 container spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Skeleton variant="rectangular" width="100%" height={450} />
          </Grid2>
        ))}
      </Grid2>
    );
  };

  if (isEmpty(opportunitiesData) && !isFilterApplied) {
    return (
      <>
        <Box my={2.5} display="flex" justifyContent="space-between" alignItems="center">
          <FilterButton
            clearFilter={clearFilter}
            closeFilter={() => setIsFilterOpen(false)}
            handleFilter={handleFilter}
            isFilterOpen={isFilterOpen}
            selectedCategoryId={selectedCategoryId}
            isFilterApplied={isFilterApplied}
            openFilter={() => setIsFilterOpen(true)}
          />
          <SearchBar
            searchTerm={searchQuery}
            placeholder={en.opportunities.searchPlaceholder}
            handleChange={handleChange}
            handleClear={handleClear}
            aria-label={en.opportunities.searchPlaceholder}
          />
        </Box>
        {isClearing ? (
          renderLoading()
        ) : (
          <>
            {debouncedSearchQuery && (
              <Grid2 container mb={2.5}>
                <Grid2 size={{ xs: 12 }}>
                  <Box width="100%">
                    <Typography variant="h3" component="h2" mb={1}>
                      {opportunitiesData.length > 1
                        ? `${opportunitiesData.length} ${en.opportunities.results} "${debouncedSearchQuery}"`
                        : `${opportunitiesData.length} ${en.opportunities.singleResult} "${debouncedSearchQuery}"`}
                    </Typography>
                  </Box>
                </Grid2>
              </Grid2>
            )}
            <ErrorFallback
              errorMessage={en.listEmptyMessage.noOpportunityData}
              hideSubtext={true}
              subtext={en.listEmptyMessage.noData}
            />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Box my={2.5} display="flex" justifyContent="space-between" alignItems="center">
        <FilterButton
          clearFilter={clearFilter}
          closeFilter={() => setIsFilterOpen(false)}
          handleFilter={handleFilter}
          isFilterOpen={isFilterOpen}
          selectedCategoryId={selectedCategoryId}
          isFilterApplied={isFilterApplied}
          openFilter={() => setIsFilterOpen(true)}
        />
        <SearchBar
          searchTerm={searchQuery}
          placeholder={en.opportunities.searchPlaceholder}
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label={en.opportunities.searchPlaceholder}
        />
      </Box>
      {(isSearchPending && searchQuery) || isClearing ? (
        renderLoading()
      ) : debouncedSearchQuery ? (
        <>
          <Grid2 container mb={2.5}>
            <Grid2 size={{ xs: 12 }}>
              <Box width="100%">
                <Typography variant="h3" component="h2" mb={1}>
                  {opportunitiesData.length > 1
                    ? `${opportunitiesData.length} ${en.opportunities.results} "${debouncedSearchQuery}"`
                    : `${opportunitiesData.length} ${en.opportunities.singleResult} "${debouncedSearchQuery}"`}
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
          <OpportunitiesListing opportunities={opportunitiesData} />
        </>
      ) : (
        <OpportunitiesListing opportunities={opportunitiesData} />
      )}
      {isEmpty(opportunitiesData) && isFilterApplied && !isClearing && (
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noOpportunityData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.noData}
        />
      )}
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default OpportunitiesContainer;
