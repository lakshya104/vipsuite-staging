import React from 'react';
import { Box } from '@mui/material';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';

interface RSVPProps {
  opportunity: OpportunityDetails;
  show: 'overview' | 'details';
}

const OfferAskComponent: React.FC<RSVPProps> = ({ opportunity, show }) => {
  return (
    <>
      {show === 'overview' ? (
        <Box dangerouslySetInnerHTML={{ __html: opportunity?.acf?.short_description }} />
      ) : (
        <Box dangerouslySetInnerHTML={{ __html: opportunity?.acf?.description }} />
      )}
    </>
  );
};

export default OfferAskComponent;
