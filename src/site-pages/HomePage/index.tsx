import React from 'react';
import BrandsPage from '@/components/BrandsPage';
import { GetBrands, GetDashboardContent } from '@/libs/api-manager/manager';
import { Brand, DashboardContent } from '@/interfaces/brand';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';

const HomePage = async () => {
  let brands: Brand[] | null = null;
  let dashboardContent: DashboardContent | null = null;

  try {
    brands = await GetBrands();
    dashboardContent = await GetDashboardContent();
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show brands currently." />;
  }

  if (!brands || brands.length === 0) {
    return <ErrorFallback errorMessage="Currently there are no brands." hideSubtext={true} />;
  }

  return <BrandsPage brands={brands} dashboardContent={dashboardContent} />;
};

export default HomePage;
