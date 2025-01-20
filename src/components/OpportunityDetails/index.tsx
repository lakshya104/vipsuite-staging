'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, CardContent, Typography, Dialog, DialogContent } from '@mui/material';
import he from 'he';
import OpportunityTabs from '@/components/OpportunityTabs';
import './OpportunityDetails.scss';
import './OpportunityTab.scss';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import OppotunityRSVP from '../OpportunityRSVP';
import ImageSlider from '../Slider';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';
import ArrowBackBtn from '../ArrowBackBtn';
import ReferCard from '../ReferCard';
import RequestItemFormButton from '../RequestItemFormButton';
import RedeemBox from '../RedeemBox';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';

interface OpportunityDetailsCardProps {
  opportunity: OpportunityDetails;
}

const OpportunityDetailsCard: React.FC<OpportunityDetailsCardProps> = ({ opportunity }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [toasterMessage, setToasterMessage] = useState<string>('');
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const images = opportunity?.acf?.web_detail_images?.map((item) => item?.sizes['vs-container']) || [
    DefaultImageFallback.LandscapePlaceholder,
  ];

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
      setToasterMessage(message ?? en.opportunities.toasterMessage.success);
    } else {
      setToasterMessage(message ?? en.opportunities.toasterMessage.error);
    }
  };

  useEffect(() => {
    if (toasterMessage) openToaster(toasterMessage);
  }, [openToaster, toasterMessage]);

  return (
    <Box className="opportunity-detail-page" component="main">
      <Typography className="page-title" variant="h2" component="h1" align="center">
        <ArrowBackBtn />
        {he.decode(opportunity?.title?.rendered)}
      </Typography>
      <Box>
        <ImageSlider images={images} withLikeIcon={true} item={opportunity} />
      </Box>
      <CardContent>
        <OpportunityTabs opportunity={opportunity} />
      </CardContent>
      {opportunity?.acf?.is_lookbook_available && (
        <>
          <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
            <ReferCard
              heading={opportunity?.acf?.lookbook_heading}
              text={opportunity?.acf?.lookbook_description}
              href={opportunity?.acf?.lookbook_pdf}
              type="lookbook"
            />
          </Box>
          <RequestItemFormButton postId={opportunity?.id} />
        </>
      )}
      {opportunity?.acf?.show_offers && <RedeemBox fetchOffers={opportunity?.acf?.show_offers} />}
      <Box>
        <Button
          variant="contained"
          className="button button--black"
          onClick={handleDialogOpen}
          disabled={opportunity?.acf?.is_rsvp}
          style={{ marginBottom: '50px' }}
        >
          {opportunity?.acf?.is_rsvp
            ? en.opportunities.opportunityRsvp.responded
            : opportunity?.acf?.cta_label || en.opportunities.opportunityRsvp.text}
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
