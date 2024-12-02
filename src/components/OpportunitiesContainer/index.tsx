'use client';
import React, { useState, useEffect, useMemo, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Box, Typography, IconButton, CircularProgress, Container, Backdrop, Grid } from '@mui/material';
import SearchBar from '../SearchBar';
import { Opportunity } from '@/interfaces/opportunities';
import { GetOpportunityCategory } from '@/libs/api-manager/manager';
import OpportunitiesListing from '../OpportunitiesListing';
import './OpportunitiesContainer.scss';
import ErrorFallback from '../ErrorFallback';
import en from '@/helpers/lang';
import OpportunitiesFilterModal from '../OpportunitiesFilterModal';

interface OpportunitiesContainerProps {
  opportunitiesData: Opportunity[];
}

const OpportunitiesContainer: React.FC<OpportunitiesContainerProps> = ({ opportunitiesData }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<{ id: number; name: string; url: string; emoji_url: string }[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFilterApplied = searchParams.get('opportunityCategory');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetOpportunityCategory();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const categoryList = response.map((item: any) => ({
          id: item.id,
          name: item.name,
          url: item.acf.image.url,
          emoji_url: item?.acf?.emoji_icon?.url,
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error('Failed to fetch categories', error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategoryId && isFilterApplied) {
      setSelectedCategoryId(parseInt(isFilterApplied));
    }
  }, [selectedCategoryId, isFilterApplied]);

  const filteredBySearch = useMemo(() => {
    if (!searchQuery.trim()) return opportunitiesData;
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return opportunitiesData.filter((event) => event.title.rendered.toLowerCase().includes(lowerCaseQuery));
  }, [opportunitiesData, searchQuery]);

  const handleFilter = (categoryId: number) => {
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
  };

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const clearFilter = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('opportunityCategory');
      router.push(`?${params.toString()}`);
      setSelectedCategoryId(null);
      setIsFilterOpen(false);
    });
  };

  if (isEmpty(opportunitiesData) && !isFilterApplied) {
    return (
      <>
        <Box my={2.5}>
          <SearchBar
            searchTerm={searchQuery}
            placeholder="Search for opportunities..."
            handleChange={handleChange}
            handleClear={handleClear}
            aria-label="Search events"
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
        <IconButton
          className="filter-button"
          onClick={() => setIsFilterOpen(true)}
          aria-label="Filter opportunities"
          sx={{
            mr: 1,
            bgcolor: selectedCategoryId || isFilterApplied ? 'lightgray' : 'transparent',
          }}
        >
          <Image src="/img/Filter.png" alt="Filter" width={30} height={30} />
        </IconButton>
        <SearchBar
          searchTerm={searchQuery}
          placeholder="Search for opportunities..."
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label="Search opportunities"
        />
      </Box>
      <OpportunitiesFilterModal
        categories={categories}
        clearFilter={clearFilter}
        closeFilter={() => setIsFilterOpen(false)}
        handleFilter={handleFilter}
        isFilterOpen={isFilterOpen}
        selectedCategoryId={selectedCategoryId}
      />
      {isEmpty(opportunitiesData) && isFilterApplied && (
        <Container>
          <Typography marginTop={10} variant="h2" textAlign="center">
            No results found for selected filter
          </Typography>
        </Container>
      )}
      {!searchQuery ? (
        <OpportunitiesListing opportunities={opportunitiesData} />
      ) : searchQuery && filteredBySearch.length > 0 ? (
        <>
          <Grid container mb={2.5}>
            <Grid item xs={12}>
              <Box width="100%">
                <Typography variant="h3" component="h2" mb={1}>
                  {filteredBySearch.length} {filteredBySearch.length > 1 ? 'Results' : 'Result'} for &quot;{searchQuery}
                  &quot;
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <OpportunitiesListing opportunities={filteredBySearch} />
        </>
      ) : (
        <Container>
          <Typography marginTop={10} variant="h2" textAlign="center">
            No results found
          </Typography>
        </Container>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default OpportunitiesContainer;
