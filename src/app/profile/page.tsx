import React from 'react';
import { BioComponent, ContactsComponent, SocialComponent } from '@/components/ProfileComponents';

interface SearchParams {
  [key: string]: string | string[];
}

interface PageProps {
  searchParams: SearchParams;
}

export default function Page({ searchParams }: PageProps) {
  const section = searchParams?.section;
  const renderSection = () => {
    switch (section) {
      case 'bio':
        return <BioComponent />;
      case 'social':
        return <SocialComponent />;
      case 'contacts':
        return <ContactsComponent />;
      default:
        return <BioComponent />;
    }
  };

  return <>{renderSection()}</>;
}
