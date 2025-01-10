import React from 'react';
import { ContentModule } from '@/interfaces/public-page';
import HeroSection from './HeroSection/HeroSection';
import SocialAccordion from './SocialAccordion';
import Partner from './Partner/Partner';
import BrandsPlace from './BrandsPlace';
import BrandClub from './BrandClub';
import { HomeModuleTypes } from '@/helpers/enums';
import PublicJoinUs from './PublicJoinUs';
import TestimonialSection from './TestimonialSection';
import PromoWrapper from './PromoWrapper';
import FAQ from './Faq';
import ModuleForm from './ModuleForm';
import TextModule from './TextModule';

interface ModuleSlidesProps {
  module: ContentModule;
}

const ModuleSlides: React.FC<ModuleSlidesProps> = ({ module }) => {
  if (module?.settings?.hide_component) return null;
  switch (module?.acf_fc_layout) {
    case HomeModuleTypes.Intro:
      return <HeroSection data={module} />;
    case HomeModuleTypes.Slider:
      return <SocialAccordion data={module} />;
    case HomeModuleTypes.InfoList:
      return <PublicJoinUs data={module} />;
    case HomeModuleTypes.InfoTable:
      return <BrandsPlace data={module} />;
    case HomeModuleTypes.Promo:
      return <BrandClub data={module} />;
    case HomeModuleTypes.PromoWrapper:
      return <PromoWrapper data={module} />;
    case HomeModuleTypes.LogoList:
      return <Partner data={module} />;
    case HomeModuleTypes.Testimonials:
      return <TestimonialSection data={module} />;
    case HomeModuleTypes.FAQ:
      return <FAQ data={module} />;
    case HomeModuleTypes.Form:
      return <ModuleForm data={module} />;
    case HomeModuleTypes.Text:
      return <TextModule data={module} />;
    default:
      return null;
  }
};

export default ModuleSlides;
