import React from 'react';
import { Box } from '@mui/material';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import { preprocessContent } from '@/helpers/utils';

interface RSVPProps {
  opportunity: OpportunityDetails;
  show: 'offer' | 'ask';
}

const OfferAskComponent: React.FC<RSVPProps> = ({ opportunity, show }) => {
  const rawContent = show === 'offer' ? opportunity?.acf?.short_description : opportunity?.acf?.description;
  const content = preprocessContent(rawContent);
  return (
    <Box
      sx={{
        iframe: {
          width: '100%',
          aspectRatio: '16/9',
          border: 0,
          my: 2,
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
          textDecoration: 'underline',
        },
      }}
      dangerouslySetInnerHTML={{ __html: content || '' }}
    />
  );
};

export default OfferAskComponent;
