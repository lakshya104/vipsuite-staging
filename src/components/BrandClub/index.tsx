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
  const decodedDescription = he.decode(brandclub?.description || '');
  const [introText, listHTML] = decodedDescription.split(/<ul>/);
  const listItems = listHTML?.match(/<li>(.*?)<\/li>/g)?.map((item) => item.replace(/<\/?li>/g, '')) || [];

  return (
    <Box component="section" className="section-club">
      <Container>
        <Grid container spacing={0} className="section-club__wrapper">
          <Grid item xs={12} sm={5.9} className="section-club__image">
            <Box
              component="img"
              src={brandclub?.image?.url}
              alt={brandclub?.image?.alt || 'VIP Brand Club members'}
              className="club-image"
            />
          </Grid>
          <Grid item xs={12} sm={6} className="section-club__content">
            <Typography variant="h2">{brandclub?.heading}</Typography>
            {introText && (
              <Typography variant="body1" paragraph>
                {introText.trim()}
              </Typography>
            )}
            {listItems.length > 0 && (
              <List>
                {listItems.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BrandClub;
