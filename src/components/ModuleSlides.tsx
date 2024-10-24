import React from 'react';
import { Box } from '@mui/material';
import { ContentModule } from '@/interfaces/public-page';
import HeroSection from './HeroSection/HeroSection';
import SocialAccordion from './SocialAccordion';
import JoinUs from './JoinUs';
import Partner from './Partner/Partner';
import TestimonialSection from './TestimonialSection';
import BrandsPlace from './BrandsPlace';
import BrandClub from './BrandClub';
import { HomeModuleTypes } from '@/helpers/enums';

interface ModuleSlidesProps {
  module: ContentModule;
}

const ModuleSlides: React.FC<ModuleSlidesProps> = ({ module }) => {
  if (module?.settings?.hide_component) return null;
  switch (module?.acf_fc_layout) {
    case HomeModuleTypes.Intro:
      return <HeroSection data={module} />;
    case HomeModuleTypes.Slider:
      return (
        <Box component="section" className="site-card">
          <SocialAccordion data={module} />
        </Box>
      );
    case HomeModuleTypes.InfoList:
      return <JoinUs data={module} />;
    case HomeModuleTypes.InfoTable:
      return <BrandsPlace data={module} />;
    case HomeModuleTypes.Promo:
      return <BrandClub data={module} />;
    case HomeModuleTypes.LogoList:
      return <Partner data={module} />;
    case HomeModuleTypes.Testimonials:
      return <TestimonialSection data={module} />;
    default:
      return null;
  }
};

export default ModuleSlides;
