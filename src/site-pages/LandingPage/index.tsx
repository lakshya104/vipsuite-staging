import React from 'react';
import { Box } from '@mui/material';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import ModuleSlides from '@/components/ModuleSlides';
import { first } from 'lodash';
import ErrorHandler from '@/components/ErrorHandler';
import en from '@/helpers/lang';

const LandingPage = async () => {
  const { data: pageData, error } = await GetPageContent('home');
  if (error) {
    return <ErrorHandler error={error} errMessage={en.landingPage.notShowLandingPage} />;
  }
  const data: PageData = first(pageData);
  return (
    <Box>
      {data?.acf?.content_modules.map((module, index) => {
        return <ModuleSlides key={index} module={module} />;
      })}
    </Box>
  );
};

export default LandingPage;
