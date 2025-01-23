import React from 'react';
import Header from '@/components/Header/Header';
import { Box } from '@mui/material';
import './landingPages.scss';
import Footer from '@/components/Footer';
import { MenuItemData } from '@/interfaces/public-page';
import { GetWebsiteContent } from '@/libs/api-manager/manager';
import { getLastPathSegment } from '@/helpers/utils';
import HeaderTop from '@/components/HeaderTop/HeaderTop';
import ProgressProvider from '@/libs/providers/ProgressProvider';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, error } = await GetWebsiteContent();
  const menuItems: MenuItemData[] = data?.header_menu.map((item: MenuItemData) => {
    item.url = getLastPathSegment(item?.url);
    return item;
  });
  if (error) {
    return <ErrorHandler error={error} errMessage={en.landingPage.notShowLandingPage} />;
  }
  return (
    <Box className="background--dark">
      <HeaderTop text={data?.website_tagline} />
      <Header menuItems={menuItems} />
      <ProgressProvider color="#FFFFF7">{children}</ProgressProvider>
      <Footer footerItems={data} />
    </Box>
  );
}
