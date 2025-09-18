'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Box, Grid2, Skeleton, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { isEmpty } from 'lodash';
import { DashboardData, DashboardItem } from '@/interfaces';
import { GetVipSearch } from '@/libs/api-manager/manager';
import SearchBar from './SearchBar';
import DashboardContentComponent from './DashboardContent';
import DashboardCard from './DashboardCard';
import ErrorFallback from './ErrorFallback';
import en from '@/helpers/lang';
import { useUserInfoStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';

interface DashboardItemsContainerProps {
  dashboardData: DashboardData;
}

const DashboardItemsContainer: React.FC<DashboardItemsContainerProps> = ({ dashboardData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DashboardItem[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 750);
  const { userRoleStore: userRole } = useUserInfoStore();

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
      const results = await GetVipSearch(debouncedSearchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error(en.listEmptyMessage.searchError, error);
      setSearchResults([]);
    } finally {
      setIsPending(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const renderSkeletons = () => (
    <Grid2 container spacing={2}>
      {[...Array(3)].map((_, index) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Skeleton variant="rectangular" width="100%" height={450} />
        </Grid2>
      ))}
    </Grid2>
  );

  const renderItems = (items: DashboardItem[]) => (
    <Grid2 className="landing-product" container spacing={2} sx={{ mb: 5 }}>
      {items.map((item, index) => (
        <Grid2 className="landing-product__item" size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
          <DashboardCard item={item} />
        </Grid2>
      ))}
    </Grid2>
  );

  const renderDashboard = () => (
    <DashboardContentComponent
      dashboardContent={dashboardData?.static_dashboard_questions}
      showMakeRequest={dashboardData?.show_make_request_form}
      formRequests={dashboardData?.dynamic_dashboard_questions}
      userRole={userRole}
    />
  );

  const isDashboardContentEmpty =
    isEmpty(dashboardData?.dynamic_dashboard_questions) &&
    !dashboardData?.show_make_request_form &&
    userRole &&
    userRole === UserRole.Brand;

  const renderContent = () => {
    if (searchQuery) {
      return hasSearched && !isEmpty(searchResults) ? renderSearchResults() : renderNoResults();
    }
    if (!dashboardData?.dashboard_content || isEmpty(dashboardData?.dashboard_content)) {
      return (
        <>
          {renderDashboard()}
          {!isEmpty(dashboardData?.dashboard_cards) ? (
            <Grid2 className="landing-product" container spacing={2}>
              {dashboardData?.dashboard_cards?.map((item, index) => (
                <Grid2 className="landing-product__item" size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                  <DashboardCard item={item} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            isDashboardContentEmpty && (
              <ErrorFallback
                errorMessage={en.listEmptyMessage.noItems}
                hideSubtext={true}
                subtext={en.listEmptyMessage.noData}
              />
            )
          )}
        </>
      );
    }

    return (
      <>
        {!isEmpty(dashboardData?.dashboard_content) && renderItems(dashboardData?.dashboard_content)}
        {renderDashboard()}
        <Grid2 className="landing-product" container spacing={2}>
          {!isEmpty(dashboardData?.dashboard_cards) &&
            dashboardData?.dashboard_cards?.map((item, index) => (
              <Grid2 className="landing-product__item" size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <DashboardCard item={item} />
              </Grid2>
            ))}
          {isDashboardContentEmpty &&
            isEmpty(dashboardData?.dashboard_cards) &&
            isEmpty(dashboardData?.dashboard_content) && (
              <ErrorFallback
                errorMessage={en.listEmptyMessage.noItems}
                hideSubtext={true}
                subtext={en.listEmptyMessage.noData}
              />
            )}
        </Grid2>
      </>
    );
  };

  const renderSearchResults = () => (
    <>
      <Grid2 container mb={2.5}>
        <Grid2 size={{ xs: 12 }}>
          <Box width="100%">
            <Typography variant="h3" component="h2" mb={1}>
              {searchResults.length} {searchResults.length > 1 ? 'Results' : 'Result'} for &quot;{searchQuery}&quot;
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
      {renderItems(searchResults)}
    </>
  );

  const renderNoResults = () => (
    <ErrorFallback errorMessage={en.listEmptyMessage.noItems} hideSubtext={true} subtext={en.listEmptyMessage.noData} />
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
