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

interface ModuleSlidesProps {
  module: ContentModule;
}

const ModuleSlides: React.FC<ModuleSlidesProps> = ({ module }) => {
  if (module?.settings?.hide_component) return null;
  switch (module?.acf_fc_layout) {
    case 'module_intro':
      return <HeroSection data={module} />;
    case 'module_slider':
      return (
        <Box component="section" className="site-card">
          <SocialAccordion data={module} />
        </Box>
      );
    case 'module_info_list':
      return <JoinUs data={module} />;
    case 'module_info_table':
      return <BrandsPlace data={module} />;
    case 'module_promo':
      return <BrandClub data={module} />;
    case 'module_logo_list':
      return <Partner data={module} />;
    case 'module_testimonials':
      return <TestimonialSection data={module} />;
    default:
      return null;
  }
};

export default ModuleSlides;
