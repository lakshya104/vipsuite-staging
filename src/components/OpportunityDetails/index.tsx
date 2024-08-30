'use client';
import React, { useState } from 'react';
import { Box, Button, CardContent, Typography, Dialog, DialogContent, Container } from '@mui/material';
import DotsMobileStepper from '@/components/Stepper';
import OpportunityTabs from '@/components/OpportunityTabs';
import './OpportunityDetails.scss';
import OppotunityRSVP from '../OpportunityRSVP';
import './OpportunityTab.scss';

const HomePage: React.FC = () => {
  const images = ['/img/maldives.png', '/img/cycle.png', '/img/opportunity.svg', '/img/maldives.png'];
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);

  return (
    <Box className="opportunity-detail-page" component='main'>
      <Container>
        <Typography className="page-title" variant="h2" component="h1" align="center">
          Barbie x Heinz
        </Typography>
        <Box>
          <DotsMobileStepper images={images} />
        </Box>
        <CardContent className=''>
          <OpportunityTabs />
        </CardContent>
        <Box>
          <Button variant="contained" className="button button--black" onClick={handleDialogOpen}>
            RSVP
          </Button>
        </Box>
        <Dialog open={dialogOpen} fullWidth maxWidth="sm">
          <DialogContent>
            <OppotunityRSVP />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default HomePage;
