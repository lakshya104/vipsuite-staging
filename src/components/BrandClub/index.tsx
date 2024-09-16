/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Container, Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import he from 'he';
import './BrandClub.scss';
import { PageData } from '@/interfaces/public-page';

interface BrandClubProps {
  data: PageData;
}

const BrandClub: React.FC<BrandClubProps> = ({ data }) => {
  const brandclub = data?.acf?.content_modules?.[2]?.content_blocks?.[0];
  const brandpoints = he.decode(brandclub?.description);
  const brandpointsArray = brandpoints
    ? brandpoints.match(/<li>(.*?)<\/li>/g)?.map((item: string) => item.replace(/<\/?li>/g, ''))
    : [];

  return (
    <Box component="section" className="section-club">
      <Container>
        <Grid container spacing={0} className="section-club__wrapper">
          <Grid item xs={12} sm={5.9} className="section-club__image">
            <Box component="img" src="/img/brandClub.svg" alt="VIP Brand Club members" />
          </Grid>
          <Grid item xs={12} sm={6} className="section-club__content">
            <Typography variant="h2">Annual VIP Brand Club</Typography>
            <Typography variant="body1" paragraph>
              {brandclub?.heading}
            </Typography>
            <List>
              {brandpointsArray?.map((item: string, index: number) => (
                <ListItem key={index} disableGutters>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
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
