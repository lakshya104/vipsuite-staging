import React from 'react';
import { Container, Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import he from 'he';
import './PromoWrapper.scss';
import { ContentModule } from '@/interfaces/public-page';
import en from '@/helpers/lang';

interface PromoWrapperProps {
  data: ContentModule;
}

const PromoWrapper: React.FC<PromoWrapperProps> = ({ data }) => {
  const decodedDescription = he.decode(data?.description || '');
  const [introText, listHTML] = decodedDescription.split(/<ul>/);
  const listItems = listHTML?.match(/<li>(.*?)<\/li>/g)?.map((item) => item.replace(/<\/?li>/g, '')) || [];

  return (
    <Box component="section" className="section-club">
      <Container>
        <Grid container spacing={0} className="section-club__wrapper">
          <Grid item xs={12} sm={5.9} className="section-club__image">
            <Box
              component="img"
              src={data?.image?.url}
              alt={data?.image?.alt || en.promoWrapper.vipBrandClub}
              className="club-image"
            />
          </Grid>
          <Grid item xs={12} sm={6} className="section-club__content">
            <Typography variant="h2">{data?.heading}</Typography>
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

export default PromoWrapper;
