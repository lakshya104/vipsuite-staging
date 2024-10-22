import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import './BrandsPlace.scss';
import { ProgressBarLink } from '../ProgressBar';
import { ContentModule } from '@/interfaces/public-page';

interface TableDataItem {
  heading: string;
  points: { copy: string }[];
}

const FeatureCell: React.FC<TableDataItem> = ({ heading, points }) => {
  return (
    <Paper elevation={0}>
      <Typography variant="h3" gutterBottom>
        {heading}
      </Typography>
      {points.map((item, index) => (
        <Typography key={index} variant="body2" paragraph>
          {item.copy}
        </Typography>
      ))}
    </Paper>
  );
};

interface BrandsPlaceProps {
  data: ContentModule;
}

const BrandsPlace: React.FC<BrandsPlaceProps> = ({ data }) => {
  const tableData = data?.table_columns as TableDataItem[] | undefined;

  return (
    <Box component="section" className="brand-section">
      <Container>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box className="brand-section__head">
              <Typography variant="h2">{data?.heading}</Typography>
              <Typography variant="body1" paragraph>
                {data?.description}
              </Typography>
              <ProgressBarLink href="/on-boarding">
                <Button variant="contained" className="button button--white">
                  Join The VIP Suite
                </Button>
              </ProgressBarLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} className="brand-section__content">
            <Grid container spacing={0}>
              {tableData &&
                tableData.map((feature, index) => (
                  <Grid item xs={12} sm={2.4} key={index} className="brand-section__item">
                    <FeatureCell heading={feature?.heading} points={feature?.points} />
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
