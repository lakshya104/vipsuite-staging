import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './JoinUs.scss';
import { ProgressBarLink } from '../ProgressBar';
import { ContentModule } from '@/interfaces/public-page';

interface JoinUsProps {
  data: ContentModule;
}
const JoinUs: React.FC<JoinUsProps> = ({ data }) => {
  return (
    <Box component="section" className="joinus-section">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box className="joinus-section__head">
              <Typography variant="h2">{data?.heading}</Typography>
              <ProgressBarLink href={'/on-boarding'}>
                <Button variant="outlined" className="button button--white">
                  {data?.cta?.link?.title}
                </Button>
              </ProgressBarLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} className="joinus-section__content">
            <Grid container spacing={2.5} justifyContent={'space-between'}>
              {data.list_items?.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={0} className="joinus-section__feature">
                    <Box className="joinus-section__icon">
                      <StarOutlineIcon />
                    </Box>
                    <Box>
                      <Typography variant="h3">{item?.heading}</Typography>
                      <Typography variant="body1">{item?.copy}</Typography>
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
