import React from 'react';
import { Box, Typography, Grid2, Container, ListItemIcon } from '@mui/material';
import Paper from '@mui/material/Paper';
import './BrandsPlace.scss';
import { ProgressBarLink } from '../ProgressBar';
import { ContentModule } from '@/interfaces/public-page';
import CheckIcon from '@mui/icons-material/Check';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

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
        <Grid2 container>
          <Grid2 size={{ xs: 12 }}>
            <Box className="brand-section__head">
              <Typography variant="h2">{data?.heading}</Typography>
              <Typography variant="body1" paragraph>
                {data?.description}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12 }} className="brand-section__content">
            <Grid2 container spacing={0}>
              {tableData &&
                tableData.map((feature, index) => (
                  <Grid2 size={{ xs: 12, sm: 2.4 }} key={index} className="brand-section__item">
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <FeatureCell heading={feature?.heading} points={feature?.points} />
                  </Grid2>
                ))}
            </Grid2>
          </Grid2>
          <ProgressBarLink className="brand-section__btn" href={paths.auth.onBoarding.getHref()}>
            {en.landingPage.joinToday}
          </ProgressBarLink>
        </Grid2>
      </Container>
    </Box>
  );
};

export default BrandsPlace;
