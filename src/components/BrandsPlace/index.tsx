import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { featureCellsData } from '@/data';
import './BrandsPlace.scss';

interface FeatureCellProps {
  title: string;
  items: (string | null | undefined)[];
}

const FeatureCell: React.FC<FeatureCellProps> = ({ title, items }) => (
  <Paper elevation={0}>
    <Typography variant="h3" gutterBottom>
      {title}
    </Typography>
    {items.map((item, index) => (
      <Typography key={index} variant="body2" paragraph>
        {item}
      </Typography>
    ))}
  </Paper>
);

FeatureCell.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const BrandsPlace: React.FC = () => {
  return (
    <Box component="section" className="brand-section">
      <Container>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box className="brand-section__head">
              <Typography variant="h2">all in one place</Typography>
              <Typography variant="body1" paragraph>
                The biggest advantage of The VIP Suite portal is the ability to do it all together in one place,
                allowing you to pick and choose which services work best to build your next activation whether to
                strengthen your VIP community or grow it further.
              </Typography>
              <Button variant="contained" className="button button--white">
                Join The VIP Suite
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} className="brand-section__content">
            <Grid container spacing={0}>
              {featureCellsData.map((feature, index) => (
                <Grid item xs={12} sm={2.4} key={index} className="brand-section__item">
                  <FeatureCell title={feature.title} items={feature.items} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BrandsPlace;
