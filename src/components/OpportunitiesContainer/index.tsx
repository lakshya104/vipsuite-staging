'use client';
import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from 'lodash';
import { Box, CircularProgress, Backdrop, Grid2, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { Opportunity } from '@/interfaces/opportunities';
import OpportunitiesListing from '../OpportunitiesListing';
import './OpportunitiesContainer.scss';
import ErrorFallback from '../ErrorFallback';
import en from '@/helpers/lang';
import FilterButton from '../FilterButton';
import { useDebounce } from 'use-debounce';

interface OpportunitiesContainerProps {
  opportunitiesData: Opportunity[];
  categories: { id: number; name: string; acf: { image: { url: string }; emoji_icon: { url: string } } }[];
}

const OpportunitiesContainer: React.FC<OpportunitiesContainerProps> = ({ opportunitiesData, categories }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [isSearchPending, startSearchTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFilterApplied = searchParams.get('opportunityCategory');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const categoryList = categories.map((item) => ({
    id: item.id,
    name: item.name,
    url: item.acf.image.url,
    emoji_url: item.acf.emoji_icon.url,
  }));

  useEffect(() => {
    if (!selectedCategoryId && isFilterApplied) {
      setSelectedCategoryId(parseInt(isFilterApplied));
    }
  }, [selectedCategoryId, isFilterApplied]);

  useEffect(() => {
    try {
      startSearchTransition(() => {
        const params = new URLSearchParams(window.location.search);
        if (debouncedSearchQuery) {
          params.set('search', debouncedSearchQuery);
        } else {
          params.delete('search');
        }
        router.push(`?${params.toString()}`, { scroll: false });
      });
    } catch (error) {
      console.error(en.opportunities.searchErrorMessage, error);
    }
  }, [debouncedSearchQuery, router]);

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
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  if (isEmpty(opportunitiesData) && !isFilterApplied) {
    return (
      <>
        <Box my={2.5}>
          <SearchBar
            searchTerm={searchQuery}
            placeholder={en.opportunities.searchPlaceholder}
            handleChange={handleChange}
            handleClear={handleClear}
            aria-label={en.opportunities.searchPlaceholder}
          />
        </Box>
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noOpportunityData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.noData}
        />
      </>
    );
  }

  return (
    <>
      <Box my={2.5} display="flex" justifyContent="space-between" alignItems="center">
        <FilterButton
          categories={categoryList}
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
      {isEmpty(opportunitiesData) && (
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noOpportunityData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.noData}
        />
      )}
      {debouncedSearchQuery && !isSearchPending && (
        <Grid2 container mb={2.5}>
          <Grid2 size={{ xs: 12 }}>
            <Box width="100%">
              <Typography variant="h3" component="h2" mb={1}>
                {opportunitiesData.length} {en.opportunities.results} &quot;{debouncedSearchQuery}&quot;
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      )}
      <OpportunitiesListing opportunities={opportunitiesData} />
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default OpportunitiesContainer;
