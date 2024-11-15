import React from 'react';
import { first, get, isEmpty } from 'lodash';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import LandingPage from '../LandingPage';
import './LandingSlugPage.scss';
import LandingSlugContainer from '@/components/LandingSlugContainer';

interface LandingSlugPageProps {
  slug: string;
}

const LandingSlugPage: React.FC<LandingSlugPageProps> = async ({ slug }) => {
  const pageData: PageData[] = await GetPageContent(slug);
  const data = first(pageData);
  const isDefaultHeroPanel = get(data, 'acf.use_default_hero_panel', false) === true;

  if (isEmpty(pageData)) {
    return <LandingPage />;
  }
  return <LandingSlugContainer isDefaultHeroPanel={isDefaultHeroPanel} data={data} />;
};

export default LandingSlugPage;
