'use client';
import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './JoinUs.scss';
import { ProgressBarLink } from '../ProgressBar';
import { PageData } from '@/interfaces/public-page';

interface JoinUsProps {
  data: PageData;
}
const JoinUs: React.FC<JoinUsProps> = ({ data }) => {
  const contentModules = data.acf.content_modules || [];
  let listItems = null;
  let heading = null;
  let cta = null;

  // eslint-disable-next-line @next/next/no-assign-module-variable
  for (const module of contentModules) {
    if (module.list_items) {
      listItems = module.list_items;
      heading = module.heading;
      cta = module.cta?.link?.title;
      break;
    }
  }

  return (
    <Box component="section" className="joinus-section">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box className="joinus-section__head">
              <Typography variant="h2">{heading}</Typography>
              <ProgressBarLink href={'/on-boarding'}>
                <Button variant="outlined" className="button button--white">
                  {cta}
                </Button>
              </ProgressBarLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} className="joinus-section__content">
            <Grid container spacing={2.5} justifyContent={'space-between'}>
              {listItems?.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={0} className="joinus-section__feature">
                    <Box className="joinus-section__icon">
                      <StarOutlineIcon />
                    </Box>
                    <Box>
                      <Typography variant="h3">{item.heading}</Typography>
                      <Typography variant="body1">{item.copy}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default JoinUs;
