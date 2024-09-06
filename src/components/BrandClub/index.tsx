import React from 'react';
import { Container, Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import './BrandClub.scss';

const BrandClub = () => {
  return (
    <Box component="section" className="section-club">
      <Container>
        <Grid container spacing={0} className="section-club__wrapper">
          <Grid item xs={12} sm={5.9} className="section-club__image">
            <Box component="img" src="/img/card.jpg" alt="VIP Brand Club members" />
          </Grid>
          <Grid item xs={12} sm={6} className="section-club__content">
            <Typography variant="h2">Annual VIP Brand Club</Typography>
            <Typography variant="body1" paragraph>
              Take your community of VIPs to the next level with a VIP club. Lorem ipsum dolor sit amet, mea nostrum
              lobortis ea. Vim fuisset reprimique theophrastus ex.
            </Typography>
            <List>
              {[
                'Bespoke VIP Brand Strategy',
                'Earned Influence & Talent Led Opportunities',
                'Forward Planning, Topical, Ad-Hoc & NPD Moments',
                'Gifting, Events & Commercial Opportunities',
              ].map((text) => (
                <ListItem key={text} disableGutters>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BrandClub;
