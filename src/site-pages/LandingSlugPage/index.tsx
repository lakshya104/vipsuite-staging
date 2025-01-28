import React from 'react';
import { first, get, isEmpty } from 'lodash';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import './LandingSlugPage.scss';
import LandingSlugContainer from '@/components/LandingSlugContainer';
import ErrorHandler from '@/components/ErrorHandler';
import RedirectIfEmpty from '@/components/RedirectIfEmpty';
import en from '@/helpers/lang';

interface LandingSlugPageProps {
  slug: string;
}

const LandingSlugPage: React.FC<LandingSlugPageProps> = async ({ slug }) => {
  const { data: pageData, error } = await GetPageContent(slug);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.landingPage.notShowLandingPage} />;
  }
  if (isEmpty(pageData)) {
    return <RedirectIfEmpty />;
  } else {
    const data: PageData = first(pageData);
    const isDefaultHeroPanel = get(data, 'acf.use_default_hero_panel', false) === true;
    return <LandingSlugContainer isDefaultHeroPanel={isDefaultHeroPanel} data={data} />;
  }
};

export default LandingSlugPage;
