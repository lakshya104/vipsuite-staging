'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { partition } from 'lodash';
import { DashboardContent, DashboardItem } from '@/interfaces';
import { GetVipSearch } from '@/libs/api-manager/manager';
import SearchBar from './SearchBar';
import DashboardContentComponent from './DashboardContent';
import DashboardCard from './DashboardCard';
import ErrorFallback from './ErrorFallback';

interface DashboardItemsContainerProps {
  dashboardItems: DashboardItem[];
  dashboardContent: DashboardContent | null;
  vipId: number;
  token: string;
  totalFollowerCount: number;
}

const DashboardItemsContainer: React.FC<DashboardItemsContainerProps> = ({
  dashboardItems,
  dashboardContent,
  vipId,
  token,
  totalFollowerCount,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<DashboardItem[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [featuredItems, nonFeaturedItems] = partition(dashboardItems, (item: DashboardItem) => item?.acf?.is_featured);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setIsPending(!!value);
    if (!value) {
      setHasSearched(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setHasSearched(false);
    setIsPending(false);
  }, []);

  const fetchSearchResults = useCallback(async () => {
    if (!debouncedSearchQuery) {
      setSearchResults([]);
      setHasSearched(false);
      setIsPending(false);
      return;
    }
    setHasSearched(true);
    try {
      const results = await GetVipSearch(debouncedSearchQuery, token, vipId);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setIsPending(false);
    }
  }, [debouncedSearchQuery, token, vipId]);

  useEffect(() => {
    fetchSearchResults();
  }, [debouncedSearchQuery, fetchSearchResults]);

  const renderSkeletons = () => (
    <Grid container spacing={2}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Skeleton variant="rectangular" width="100%" height={450} />
        </Grid>
      ))}
    </Grid>
  );

  const renderItems = (items: DashboardItem[]) => (
    <Grid className="landing-product" container spacing={2} sx={{ mb: 5 }}>
      {items.map((item, index) => (
        <Grid className="landing-product__item" item xs={12} sm={6} lg={4} key={index}>
          <DashboardCard item={item} vipId={vipId} token={token} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <Box my={2.5}>
        <SearchBar
          searchTerm={searchQuery}
          placeholder="Search for anything..."
          handleChange={handleChange}
          handleClear={handleClear}
          aria-label="Search Anything"
        />
      </Box>

      {isPending ? (
        renderSkeletons()
      ) : (
        <>
          {!searchQuery ? (
            <>
              {featuredItems.length === 0 && nonFeaturedItems.length === 0 ? (
                <>
                  {dashboardContent && (
                    <Box className="gray-card" display="flex" justifyContent="space-between" gap={2.5}>
                      <DashboardContentComponent
                        dashboardContent={dashboardContent}
                        totalFollowers={totalFollowerCount}
                      />
                    </Box>
                  )}
                  <ErrorFallback errorMessage="No dashboard items available currently" hideSubtext />
                </>
              ) : (
                <>
                  {featuredItems.length > 0 && renderItems(featuredItems)}
                  {dashboardContent && (
                    <Box className="gray-card" display="flex" justifyContent="space-between" gap={2.5}>
                      <DashboardContentComponent
                        dashboardContent={dashboardContent}
                        totalFollowers={totalFollowerCount}
                      />
                    </Box>
                  )}
                  {nonFeaturedItems.length > 0 && renderItems(nonFeaturedItems)}
                </>
              )}
            </>
          ) : (
            hasSearched && searchResults.length > 0 && renderItems(searchResults)
          )}
        </>
      )}
    </>
  );
};

export default DashboardItemsContainer;
