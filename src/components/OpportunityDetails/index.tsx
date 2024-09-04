'use client';
import React, { useState } from 'react';
import { Box, Button, CardContent, Typography, Dialog, DialogContent } from '@mui/material';
import OpportunityTabs from '@/components/OpportunityTabs';
import './OpportunityDetails.scss';
import './OpportunityTab.scss';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import OppotunityRSVP from '../OpportunityRSVP/OpportunityRSVP';
import ImageSlider from '../Slider';

interface OpportunityDetailsCardProps {
  opportunity: OpportunityDetails;
  token: string;
}

const OpportunityDetailsCard: React.FC<OpportunityDetailsCardProps> = ({ opportunity, token }) => {
  const images = ['/img/maldives.png', '/img/cycle.png', '/img/opportunity.svg', '/img/maldives.png'];
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmationOpen = () => {
    setDialogOpen(false);
  };

  return (
    <Box className="opportunity-detail-page" component="main">
      <Typography className="page-title" variant="h2" component="h1" align="center">
        {opportunity.title.rendered}
      </Typography>
      <Box>
        <ImageSlider images={images} />
      </Box>
      <CardContent>
        <OpportunityTabs opportunity={opportunity} />
      </CardContent>
      <Box>
        <Button
          variant="contained"
          className="button button--black"
          onClick={handleDialogOpen}
          disabled={opportunity?.acf.is_rsvp}
          style={{ marginBottom: '50px' }}
        >
          {opportunity?.acf.is_rsvp ? 'Already Responded' : ' Respond Now'}
        </Button>
      </Box>
      <Dialog open={dialogOpen} fullWidth maxWidth="sm" onClose={handleDialogClose}>
        <DialogContent>
          <OppotunityRSVP
            token={token}
            onClose={handleDialogClose}
            onConfirmation={handleConfirmationOpen}
            opportunity={opportunity}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OpportunityDetailsCard;
