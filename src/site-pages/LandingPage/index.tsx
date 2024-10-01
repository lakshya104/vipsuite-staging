import ErrorHandler from '@/components/ErrorHandler';
import HeroSection from '@/components/HeroSection/HeroSection';
import JoinUs from '@/components/JoinUs';
import Partner from '@/components/Partner/Partner';
import SocialAccordion from '@/components/SocialAccordion';
import TestimonialSection from '@/components/TestimonialSection';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import { Box } from '@mui/material';
import React from 'react';

const LandingPage = async () => {
  try {
    const pageData: PageData = await GetPageContent(234);
    return (
      <Box>
        <HeroSection data={pageData} />
        <Box component="section" className="site-card">
          <SocialAccordion data={pageData} />
        </Box>
        <JoinUs data={pageData} />
        <Partner data={pageData} />
        <TestimonialSection data={pageData} />
      </Box>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Error fetching page content" />;
  }
};

export default LandingPage;
