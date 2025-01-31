import React from 'react';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import ShowHtml from './ShowHtml';

interface RSVPProps {
  opportunity: OpportunityDetails;
  show: 'offer' | 'ask';
}

const OfferAskComponent: React.FC<RSVPProps> = ({ opportunity, show }) => {
  const rawContent = show === 'offer' ? opportunity?.acf?.the_offer : opportunity?.acf?.the_ask;
  return <ShowHtml text={rawContent} />;
};

export default OfferAskComponent;
