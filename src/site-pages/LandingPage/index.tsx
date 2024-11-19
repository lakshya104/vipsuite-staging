import React from 'react';
import { Box } from '@mui/material';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import ModuleSlides from '@/components/ModuleSlides';
import { first } from 'lodash';
import ErrorHandler from '@/components/ErrorHandler';

const LandingPage = async () => {
  try {
    const pageData: PageData[] = await GetPageContent('home');
    const data = first(pageData);
    return (
      <Box>
        {data?.acf?.content_modules.map((module, index) => {
          return <ModuleSlides key={index} module={module} />;
        })}
      </Box>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show landing page content currently." />;
  }
};

export default LandingPage;
