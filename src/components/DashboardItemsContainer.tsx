'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { isEmpty, partition } from 'lodash';
import { DashboardContent, DashboardItem } from '@/interfaces';
import { GetVipSearch } from '@/libs/api-manager/manager';
import SearchBar from './SearchBar';
import DashboardContentComponent from './DashboardContent';
import DashboardCard from './DashboardCard';
import ErrorFallback from './ErrorFallback';
import { useUserInfoStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';

interface DashboardItemsContainerProps {
  dashboardItems: DashboardItem[];
  dashboardContent: DashboardContent | null;
  vipId: number;
  token: string;
  totalFollowerCount?: number;
  userRole: UserRole;
  userEmail: string;
}

const DashboardItemsContainer: React.FC<DashboardItemsContainerProps> = ({
  dashboardItems,
  dashboardContent,
  vipId,
  token,
  totalFollowerCount,
  userRole,
  userEmail,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<DashboardItem[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [featuredItems, nonFeaturedItems] = partition(dashboardItems, (item: DashboardItem) => item?.is_featured);
  const { setVipIdStore, setTokenStore, setUserRoleStore, setUserEmailStore } = useUserInfoStore();

  useEffect(() => {
    setVipIdStore(vipId);
    setTokenStore(token);
    setUserRoleStore(userRole);
    setUserEmailStore(userEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      setIsPending(true);
    } else {
      setIsPending(false);
      setHasSearched(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setHasSearched(false);
    setIsPending(false);
  }, []);

  const fetchSearchResults = useCallback(async () => {
    if (isEmpty(debouncedSearchQuery)) {
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
  }, [fetchSearchResults]);

  const renderSkeletons = () => (
    <Grid container spacing={2}>
      {[...Array(3)].map((_, index) => (
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
          <DashboardCard item={item} />
        </Grid>
      ))}
    </Grid>
  );

  const renderDashboard = () =>
    dashboardContent && (
      <DashboardContentComponent dashboardContent={dashboardContent} totalFollowers={totalFollowerCount} />
    );

  const renderContent = () => {
    if (searchQuery) {
      return hasSearched && !isEmpty(searchResults) ? renderSearchResults() : renderNoResults();
    }
    if (isEmpty(featuredItems) && isEmpty(nonFeaturedItems)) {
      return (
        <>
          {dashboardContent && renderDashboard()}
          <ErrorFallback errorMessage="No dashboard items available currently" hideSubtext />
        </>
      );
    }

    return (
      <>
        {!isEmpty(featuredItems) && renderItems(featuredItems)}
        {dashboardContent && renderDashboard()}
        {!isEmpty(nonFeaturedItems) && renderItems(nonFeaturedItems)}
      </>
    );
  };

  const renderSearchResults = () => (
    <>
      <Grid container mb={2.5}>
        <Grid item xs={12}>
          <Box width="100%">
            <Typography variant="h3" component="h2" mb={1}>
              {searchResults.length} {searchResults.length > 1 ? 'Results' : 'Result'} for &quot;{searchQuery}&quot;
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {renderItems(searchResults)}
    </>
  );

  const renderNoResults = () => (
    <Container>
      <Typography marginTop={5} variant="h2" textAlign="center">
        No results found
      </Typography>
    </Container>
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

      {isPending ? renderSkeletons() : <>{renderContent()}</>}
    </>
  );
};

export default DashboardItemsContainer;
