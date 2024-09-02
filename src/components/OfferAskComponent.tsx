import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';

interface RSVPProps {
  opportunity: OpportunityDetails;
  show: 'offer' | 'ask';
}

const OfferAskComponent: React.FC<RSVPProps> = ({ opportunity, show }) => {
  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        {opportunity.title.rendered}
      </Typography>
      {show === 'offer' ? (
        <Box dangerouslySetInnerHTML={{ __html: opportunity.acf.the_offer }} />
      ) : (
        <Box dangerouslySetInnerHTML={{ __html: opportunity.acf.the_ask }} />
      )}
    </>
  );
};

export default OfferAskComponent;
