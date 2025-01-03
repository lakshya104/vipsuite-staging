import React from 'react';
import { first, get, isEmpty } from 'lodash';
import { PageData } from '@/interfaces/public-page';
import { GetPageContent } from '@/libs/api-manager/manager';
import './LandingSlugPage.scss';
import LandingSlugContainer from '@/components/LandingSlugContainer';
import ErrorHandler from '@/components/ErrorHandler';
import RedirectIfEmpty from '@/components/RedirectIfEmpty';

interface LandingSlugPageProps {
  slug: string;
}

const LandingSlugPage: React.FC<LandingSlugPageProps> = async ({ slug }) => {
  try {
    const pageData: PageData[] = await GetPageContent(slug);
    if (isEmpty(pageData)) {
      return <RedirectIfEmpty />;
    } else {
      const data = first(pageData);
      const isDefaultHeroPanel = get(data, 'acf.use_default_hero_panel', false) === true;
      return <LandingSlugContainer isDefaultHeroPanel={isDefaultHeroPanel} data={data} />;
    }
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show page content currently." />;
  }
};

export default LandingSlugPage;
