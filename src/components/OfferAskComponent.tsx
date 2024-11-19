import React from 'react';
import { Box } from '@mui/material';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';

interface RSVPProps {
  opportunity: OpportunityDetails;
  show: 'overview' | 'details';
}

const OfferAskComponent: React.FC<RSVPProps> = ({ opportunity, show }) => {
  const content = show === 'overview' ? opportunity?.acf?.short_description : opportunity?.acf?.description;

  return (
    <Box
      sx={{
        iframe: {
          width: '100%',
          aspectRatio: '16/9',
          border: 0,
        },
        video: {
          maxWidth: '100%',
          height: 'auto',
        },
        p: {
          marginBottom: 2,
        },
        a: {
          color: 'blue',
        },
      }}
      dangerouslySetInnerHTML={{ __html: content || '' }}
    />
  );
};

export default OfferAskComponent;
