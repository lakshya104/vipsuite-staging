'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, CardContent, Typography, Dialog, DialogContent } from '@mui/material';
import OpportunityTabs from '@/components/OpportunityTabs';
import './OpportunityDetails.scss';
import './OpportunityTab.scss';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import OppotunityRSVP from '../OpportunityRSVP/OpportunityRSVP';
import ImageSlider from '../Slider';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';

interface OpportunityDetailsCardProps {
  opportunity: OpportunityDetails;
}

const OpportunityDetailsCard: React.FC<OpportunityDetailsCardProps> = ({ opportunity }) => {
  const images = opportunity?.acf?.gallery?.map((item) => item.url) || [];
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterMessage, setToasterMessage] = useState('');
  const [toasterType, setToasterType] = useState('');

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleConfirmationOpen = () => {
    setDialogOpen(false);
  };
  const handleToasterMessage = (type: 'error' | 'success', message?: string) => {
    setToasterType(type);
    if (type === 'success') {
      setToasterMessage(message ?? 'Response submitted successfully');
    } else {
      setToasterMessage(message ?? 'Error submitting response');
    }
  };

  useEffect(() => {
    if (toasterMessage) openToaster(toasterMessage);
  }, [openToaster, toasterMessage]);

  return (
    <Box className="opportunity-detail-page" component="main">
      <Typography className="page-title" variant="h2" component="h1" align="center">
        {opportunity.title.rendered}
      </Typography>
      <Box>
        <ImageSlider images={images} withLikeIcon={true} item={opportunity} />
      </Box>
      <CardContent>
        <OpportunityTabs opportunity={opportunity} />
      </CardContent>
      <Box>
        <Button
          variant="contained"
          className="button button--black"
          onClick={handleDialogOpen}
          disabled={opportunity?.acf?.is_rsvp}
          style={{ marginBottom: '50px' }}
        >
          {opportunity?.acf?.is_rsvp ? 'Already Responded' : ' Respond Now'}
        </Button>
      </Box>
      <Dialog className="site-dialog" open={dialogOpen} fullWidth maxWidth="sm" onClose={handleDialogClose}>
        <DialogContent>
          <OppotunityRSVP
            onClose={handleDialogClose}
            onConfirmation={handleConfirmationOpen}
            opportunity={opportunity}
            handleToasterMessage={handleToasterMessage}
          />
        </DialogContent>
      </Dialog>
      <Toaster
        open={toasterOpen}
        setOpen={closeToaster}
        message={error}
        severity={toasterType as 'error' | 'success' | 'warning' | 'info'}
      />
    </Box>
  );
};

export default OpportunityDetailsCard;
